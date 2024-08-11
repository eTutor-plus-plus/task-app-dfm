import { Injectable, Logger } from '@nestjs/common';
import { TaskService } from '../task/task.service';
import {
  SubmissionDataSchema,
  SubmissionSchema,
} from '../models/submissions/submission.schema';
import { TaskSchema } from '../models/tasks/task.schema';
import { VisualizationService } from '../visualization/visualization.service';
import { AbstractElement } from '../models/ast/abstractElement';
import { ParserService } from '../parser/parser.service';
import { EvaluationError } from '../common/errors/evaluation.error';
import { GradingSchema } from '../models/schemas/grading.dto.schema';
import { PrismaService } from '../prisma.service';
import { FactElement } from '../models/ast/factElement';

@Injectable()
export class EvaluationService {
  private readonly logger = new Logger(EvaluationService.name);
  private taskService: TaskService;
  private visualizationService: VisualizationService;
  private parserService: ParserService;
  private prisma: PrismaService;
  hash = require('object-hash');

  constructor(
    taskService: TaskService,
    visualizationService: VisualizationService,
    parserService: ParserService,
    prisma: PrismaService,
  ) {
    this.taskService = taskService;
    this.visualizationService = visualizationService;
    this.parserService = parserService;
    this.prisma = prisma;
  }

  async evaluateSubmission(
    submission: SubmissionDataSchema,
    task: TaskSchema,
    persist: boolean,
  ): Promise<any> {
    //TODO: Fill array of feedback that will be parsed by message handler and sent back as feedback
    // Probably create empty grading object and add criterias on demand - also exceptions have to be caught
    const elements = await this.parseInput(submission.submission.input, task);
    const grading = this.buildGradingObject(task);
    await this.gradeSubmission(elements, task, grading);
    grading.visualization = await this.generateSVG(elements);
    if (persist) {
      await this.createGrading(submission, grading);
    }
    return grading;
  }

  private buildGradingObject(task: TaskSchema): GradingSchema {
    const grading = {
      grading: {
        maxPoints: task.maxPoints,
        points: task.maxPoints,
        criteria: ([] = []),
      },
    };
    return grading as GradingSchema;
  }

  private async parseInput(input: string, task: TaskSchema) {
    const elements = this.parserService.getAST(input);
    const uniqueNames = Array.from(
      this.parserService.extractUniqueNamesFromAST(elements),
    );
    for (let i = 0; i < uniqueNames.length; i++) {
      if (!task.uniqueNames.includes(uniqueNames[i])) {
        throw new EvaluationError(
          `Unknown name ${uniqueNames[i]} while parsing input.`,
        );
      }
    }
    return elements;
  }

  private async generateSVG(elements: AbstractElement[]) {
    const rawSVG = await this.visualizationService.getVisualization(elements);
    return rawSVG;
  }

  private async gradeSubmission(
    elements: AbstractElement[],
    task: TaskSchema,
    grading: GradingSchema,
  ): Promise<GradingSchema> {
    for (const evaluationCriteria of task.additionalData.evaluationCriteria) {
      const evaluationElements = this.parserService.getAST(
        evaluationCriteria.subtree,
      );
      for (let i = 0; i < evaluationElements.length; i++) {
        const evaluationElement = evaluationElements[i];
        const element = elements.find((e) => e.name === evaluationElement.name);
        const criteriaPassed = this.evaluateCriteria(
          element,
          evaluationElement,
        );
        grading.grading.criteria.push({
          name: evaluationCriteria.name,
          points: criteriaPassed ? evaluationCriteria.points : 0,
          passed: criteriaPassed,
          feedback: `Solution of ${element.name} is ${criteriaPassed ? 'correct' : 'incorrect'}`,
        });
        if (!criteriaPassed) {
          grading.grading.points -= evaluationCriteria.points;
          break;
        }
      }
    }
    return grading;
  }

  //TODO: Check why example input is failing
  /*
  {
  "userId": "DemoUserId1",
  "assignmentId": "1",
  "taskId": 1,
  "language": "EN",
  "mode": "RUN",
  "feedbackLevel": 3,
  "submission": {
    "input": "fact Sales {profit; {descriptive} accountant;}; dimension ProductDim {product - category - family; }; Sales - ProductDim;"
  }
}
   */

  private evaluateCriteria(
    submissionElement: AbstractElement,
    evaluationCriteriaElement: AbstractElement,
  ): boolean {
    try {
      if (!submissionElement || !evaluationCriteriaElement) {
        return false;
      }
      if (
        submissionElement instanceof FactElement &&
        evaluationCriteriaElement instanceof FactElement
      ) {
        const evaluationCriteriaFact = evaluationCriteriaElement as FactElement;
        const submissionFact = submissionElement as FactElement;

        const isFactEqual =
          evaluationCriteriaFact.equalsWithoutDimensions(submissionFact);

        if (evaluationCriteriaFact.dimensions.length === 0) {
          return isFactEqual;
        } else {
          for (const dimension of evaluationCriteriaFact.dimensions) {
            const submissionDimension = submissionFact.dimensions.find(
              (d) => d.name === dimension.name,
            );
            const isDimensionEqual = this.evaluateCriteria(
              submissionDimension,
              dimension,
            );
            if (!isDimensionEqual) {
              return false;
            }
          }
          return isFactEqual;
        }
      }
      return evaluationCriteriaElement.equals(submissionElement);
    } catch (error) {
      this.logger.error(
        `Error while evaluating criteria ${evaluationCriteriaElement.name} with error: ${error}`,
      );
      return false;
    }
  }

  async createGrading(
    submission: SubmissionSchema,
    grading: GradingSchema,
  ): Promise<GradingSchema> {
    const createdSubmission = await this.prisma.$transaction(async () => {
      const createdGrading = await this.prisma.grading.create({
        data: {
          points: grading.grading.points,
          generalFeedback: grading.grading.generalFeedback,
          submission: {
            connect: {
              id: submission.id,
            },
          },
        },
      });

      for (const gradingCriteria of grading.grading.criteria) {
        await this.prisma.gradingCriterias.create({
          data: {
            name: gradingCriteria.name,
            points: gradingCriteria.points,
            passed: gradingCriteria.passed,
            feedback: gradingCriteria.feedback,
            grading: {
              connect: {
                id: createdGrading.id,
              },
            },
          },
        });
      }

      return this.prisma.grading.findUnique({
        where: {
          id: createdGrading.id,
        },
        include: {
          gradingCriterias: true,
        },
      });
    });
    return createdSubmission;
  }
}

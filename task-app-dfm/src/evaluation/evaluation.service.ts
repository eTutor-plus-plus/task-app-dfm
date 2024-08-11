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
import {
  GradingCriteriaSchema,
  GradingSchema,
} from '../models/schemas/grading.dto.schema';
import { PrismaService } from '../prisma.service';
import { FactElement } from '../models/ast/factElement';
3;
import { Mode } from '@prisma/client';

@Injectable()
export class EvaluationService {
  private readonly logger = new Logger(EvaluationService.name);
  private taskService: TaskService;
  private visualizationService: VisualizationService;
  private parserService: ParserService;
  private prisma: PrismaService;

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
    const criteria: GradingCriteriaSchema[] = [];
    const elements = await this.parseInput(
      submission.submission.input,
      task,
      criteria,
    );
    let visualization = null;
    if (elements) {
      await this.gradeSubmission(elements, task, criteria);
      visualization = await this.generateSVG(elements);
    }
    // Move grading creation to end of function
    const grading = this.buildGradingObject(
      task,
      visualization,
      criteria,
      submission,
    );
    if (persist) {
      await this.createGrading(submission, grading);
    }
    return grading;
  }

  private buildGradingObject(
    task: TaskSchema,
    visualization: string,
    criteria: GradingCriteriaSchema[],
    submission: SubmissionDataSchema,
  ): GradingSchema {
    const gradingSchema = {
      grading: {
        maxPoints: task.maxPoints,
        points: 0,
        criteria: [] as GradingCriteriaSchema[],
        generalFeedback: '',
      },
    };
    const points = criteria.reduce((acc, curr) => acc + curr.points, 0);
    const diff = task.maxPoints - points;
    switch (submission.mode) {
      case Mode.RUN:
        gradingSchema.grading.generalFeedback = submission.submission.input;
        break;
      case Mode.DIAGNOSE:
        if (diff === 0) {
          gradingSchema.grading.generalFeedback = 'correct';
        } else if (diff > 0 && diff < task.maxPoints) {
          gradingSchema.grading.generalFeedback = 'partially correct';
        } else {
          gradingSchema.grading.generalFeedback = 'incorrect';
        }
        gradingSchema.grading.points = points;
        if (submission.feedbackLevel > 0) {
          gradingSchema.grading.criteria = criteria;
        }
        break;
      case Mode.SUBMIT:
        if (criteria.length === 0 && diff === 0) {
          gradingSchema.grading.generalFeedback = 'correct';
        } else {
          gradingSchema.grading.generalFeedback = 'incorrect';
        }
        gradingSchema.grading.points = points;
        break;
      default:
        this.logger.error(`Unexpected value: ${submission.mode}`);
        throw new Error(`Unexpected value: ${submission.mode}`);
    }
    const grading = gradingSchema as GradingSchema;
    if (visualization) {
      grading.visualization = visualization;
    }
    return grading;
  }

  private async parseInput(
    input: string,
    task: TaskSchema,
    criteria: GradingCriteriaSchema[],
  ): Promise<AbstractElement[]> {
    let elements: AbstractElement[] = [];
    try {
      elements = this.parserService.getAST(input);
    } catch (error) {
      criteria.push({
        name: 'Syntax',
        points: null,
        passed: false,
        feedback: error.toString(),
      });
      return null;
    }
    const uniqueNames = Array.from(
      this.parserService.extractUniqueNamesFromAST(elements),
    );
    for (let i = 0; i < uniqueNames.length; i++) {
      if (!task.uniqueNames.includes(uniqueNames[i])) {
        criteria.push({
          name: 'Syntax',
          points: null,
          passed: false,
          feedback: `Unknown identifier '${uniqueNames[i]}' in submission`,
        });
        return null;
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
    criteria: GradingCriteriaSchema[],
  ): Promise<GradingSchema> {
    if (!elements) {
      return;
    }
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
        criteria.push({
          name: evaluationCriteria.name,
          points: criteriaPassed ? evaluationCriteria.points : 0,
          passed: criteriaPassed,
          feedback: `Solution of ${element.name} is ${criteriaPassed ? 'correct' : 'incorrect'}`,
        });
        if (!criteriaPassed) {
          break;
        }
      }
    }
  }

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

import { Injectable, Logger, NotImplementedException } from '@nestjs/common';
import { TaskService } from '../task/task.service';
import { SubmissionSchema } from '../models/submissions/submission.schema';
import { TaskSchema } from '../models/tasks/task.schema';
import { VisualizationService } from '../visualization/visualization.service';
import { AbstractElement } from '../models/ast/abstractElement';
import { ParserService } from '../parser/parser.service';
import { EvaluationError } from '../common/errors/evaluation.error';
import {
  gradingSchema,
  GradingSchema,
} from '../models/schemas/grading.dto.schema';
import { PrismaService } from '../prisma.service';

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
    submission: SubmissionSchema,
    task: TaskSchema,
    persist: boolean,
  ): Promise<any> {
    //TODO: Fill array of feedback that will be parsed by message handler and sent back as feedback
    // Probably create empty grading object and add criterias on demand - also exceptions have to be caught
    const elements = await this.parseInput(submission.input, task);
    const grading = this.buildGradingObject(task);
    await this.gradeSubmission(elements, task, grading);
    grading.visualization = await this.generateSVG(elements);
    if (persist) {
      await this.createGrading(submission, grading);
    }
    return grading;
  }

  private buildGradingObject(task: TaskSchema): GradingSchema {
    const grading = gradingSchema.parse(task.id);
    grading.grading.maxPoints = task.maxPoints;
    grading.grading.points = task.maxPoints;
    return grading;
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
      const evaluationElements = JSON.parse(
        evaluationCriteria.abstractSyntaxTree,
      ) as AbstractElement[];
      for (let i = 0; i < evaluationElements.length; i++) {
        const evaluationElement = evaluationElements[i];
        const element = elements.find((e) => e.name == evaluationElement.name);
        //TODO: Check if two this is sufficient for comparison
        if (
          !element ||
          JSON.stringify(element) != JSON.stringify(evaluationElement)
        ) {
          grading.grading.points -= evaluationCriteria.points;
          grading.grading.criteria.push({
            name: evaluationCriteria.name,
            points: evaluationCriteria.points,
            passed: false,
            feedback: `Solution of ${element.name} is incorrect.`,
          });
          break;
        }
      }
    }
    return grading;
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

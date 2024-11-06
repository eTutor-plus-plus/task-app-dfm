import { Injectable, Logger } from '@nestjs/common';
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
import { Mode } from '@prisma/client';
import { I18nService } from 'nestjs-i18n';
import { DimensionElement } from '../models/ast/dimensionElement';

3;

@Injectable()
export class EvaluationService {
  private readonly logger = new Logger(EvaluationService.name);
  escapeHtml = require('escape-html');

  constructor(
    private readonly visualizationService: VisualizationService,
    private readonly parserService: ParserService,
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService,
  ) {}

  async evaluateSubmission(
    submission: SubmissionDataSchema,
    task: TaskSchema,
    persist: boolean,
  ): Promise<any> {
    const criteria: GradingCriteriaSchema[] = [];
    const elements = await this.parseInput(task, criteria, submission);
    let visualization = null;
    if (elements) {
      await this.gradeSubmission(elements, task, criteria, submission);
      visualization = await this.generateSVG(elements);
    }
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
          gradingSchema.grading.generalFeedback = this.i18n.t(
            'general.correct.simple',
            {
              lang: submission.language.toLowerCase(),
            },
          );
        } else if (diff > 0 && diff < task.maxPoints) {
          gradingSchema.grading.generalFeedback = this.i18n.t(
            'general.partially-correct',
            {
              lang: submission.language.toLowerCase(),
            },
          );
        } else {
          gradingSchema.grading.generalFeedback = this.i18n.t(
            'general.incorrect.simple',
            {
              lang: submission.language.toLowerCase(),
            },
          );
        }
        gradingSchema.grading.points = points;
        if (submission.feedbackLevel > 0) {
          gradingSchema.grading.criteria = criteria;
        }
        break;
      case Mode.SUBMIT:
        if (criteria.length === 0 && diff === 0) {
          gradingSchema.grading.generalFeedback =
            gradingSchema.grading.generalFeedback = this.i18n.t(
              'general.correct.simple',
              {
                lang: submission.language.toLowerCase(),
              },
            );
        } else {
          gradingSchema.grading.generalFeedback =
            gradingSchema.grading.generalFeedback = this.i18n.t(
              'general.incorrect.simple',
              {
                lang: submission.language.toLowerCase(),
              },
            );
        }
        gradingSchema.grading.points = points;
        break;
      default:
        this.logger.error(`Unexpected value: ${submission.mode}`);
        throw new Error(`Unexpected value: ${submission.mode}`);
    }
    const grading = gradingSchema as GradingSchema;
    if (visualization) {
      grading.grading.criteria.push({
        name: 'Visualization',
        points: null,
        passed: null,
        feedback: visualization,
      });
    }
    return grading;
  }

  private async parseInput(
    task: TaskSchema,
    criteria: GradingCriteriaSchema[],
    submission: SubmissionDataSchema,
  ): Promise<AbstractElement[]> {
    let elements: AbstractElement[] = [];
    try {
      elements = this.parserService.getAST(
        submission.submission.input,
        submission.language,
      );
    } catch (error) {
      criteria.push({
        name: this.i18n.t('general.syntax-error.simple', {
          lang: submission.language.toLowerCase(),
        }),
        points: 0,
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
          name: this.i18n.t('general.syntax-error.simple', {
            lang: submission.language.toLowerCase(),
          }),
          points: 0,
          passed: false,
          feedback: this.i18n.t('general.unknown-identifier', {
            lang: submission.language.toLowerCase(),
            args: { uniqueName: uniqueNames[i] },
          }),
        });
        return null;
      }
    }
    return elements;
  }

  private async generateSVG(elements: AbstractElement[]) {
    const rawSVG = await this.visualizationService.getVisualization(elements);
    return this.escapeHtml(rawSVG);
  }

  private async gradeSubmission(
    elements: AbstractElement[],
    task: TaskSchema,
    criteria: GradingCriteriaSchema[],
    submission: SubmissionDataSchema,
  ): Promise<GradingSchema> {
    if (!elements) {
      return;
    }

    const criteriaMap = new Map<string, GradingCriteriaSchema>();

    for (const evaluationCriteria of task.additionalData.evaluationCriteria) {
      const evaluationElements = this.parserService.getAST(
        evaluationCriteria.subtree,
        submission.language,
      );
      for (let i = 0; i < evaluationElements.length; i++) {
        const evaluationElement = evaluationElements[i];
        const element = this.findElementByName(
          evaluationElement.name,
          elements,
        );
        const criteriaPassed = this.evaluateCriteria(
          element,
          evaluationElement,
          evaluationCriteria.allowIncorrectFactClass,
          evaluationCriteria.allowAdditionalElements,
        );

        const existingCriteria = evaluationCriteria.id
          ? criteriaMap.get(evaluationCriteria.id)
          : null;

        if (!existingCriteria) {
          criteriaMap.set(evaluationCriteria.name, {
            name: evaluationCriteria.name,
            points: criteriaPassed ? evaluationCriteria.points : 0,
            passed: criteriaPassed,
            feedback: this.i18n.t(
              criteriaPassed
                ? 'general.correct.extended'
                : 'general.incorrect.extended',
              {
                lang: submission.language.toLowerCase(),
                args: { name: evaluationCriteria.name },
              },
            ),
          });
        }
        if (!criteriaPassed) {
          break;
        }
      }
    }
    criteriaMap.forEach((value) => {
      criteria.push(value);
    });
  }

  private findElementByName(
    name: string,
    elements: AbstractElement[],
  ): AbstractElement {
    for (const element of elements) {
      if (element instanceof FactElement && element.name === name) {
        return element;
      } else if (element instanceof FactElement && element.name !== name) {
        for (const dimension of element.dimensions) {
          const result = this.findElementByName(name, [dimension]);
          if (result) {
            return result;
          }
        }
      }
      if (element instanceof DimensionElement && element.name === name) {
        return element;
      }
    }
    return null;
  }

  private evaluateCriteria(
    submissionElement: AbstractElement,
    evaluationCriteriaElement: AbstractElement,
    allowIncorrectFactClass: boolean,
    allowAdditionalElements: boolean,
  ): boolean {
    try {
      if (!submissionElement || !evaluationCriteriaElement) {
        return false;
      }
      if (
        submissionElement instanceof FactElement &&
        evaluationCriteriaElement instanceof FactElement
      ) {
        if (allowIncorrectFactClass) {
          return true;
        }
        const evaluationCriteriaFact = evaluationCriteriaElement as FactElement;
        const submissionFact = submissionElement as FactElement;

        const isFactEqual =
          evaluationCriteriaFact.equalsWithoutDimensions(submissionFact);

        if (
          evaluationCriteriaFact.dimensions.length === 0 &&
          allowAdditionalElements
        ) {
          return isFactEqual;
        } else {
          for (const dimension of evaluationCriteriaFact.dimensions) {
            const submissionDimension = submissionFact.dimensions.find(
              (d) => d.name === dimension.name,
            );
            const isDimensionEqual = this.evaluateCriteria(
              submissionDimension,
              dimension,
              allowIncorrectFactClass,
              allowAdditionalElements,
            );
            if (!isDimensionEqual) {
              return false;
            }
          }
          return isFactEqual;
        }
      }
      if (
        submissionElement instanceof DimensionElement &&
        evaluationCriteriaElement instanceof DimensionElement &&
        allowAdditionalElements
      ) {
        const evaluationCriteriaDimension =
          evaluationCriteriaElement as DimensionElement;
        const submissionDimension = submissionElement as DimensionElement;

        return evaluationCriteriaDimension.containsAllHierarchies(
          submissionDimension,
        );
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
    return this.prisma.$transaction(async () => {
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
        if (gradingCriteria.name === 'Visualization') {
          continue;
        }
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

      await this.prisma.submissions.update({
        where: {
          id: submission.id,
        },
        data: {
          gradingAvailable: true,
        },
      });

      return this.prisma.grading.findUnique({
        where: {
          id: createdGrading.id,
        },
        include: {
          gradingCriterias: true,
        },
      });
    });
  }
}

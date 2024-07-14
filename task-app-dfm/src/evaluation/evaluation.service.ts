import { Injectable, Logger } from '@nestjs/common';
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
import { EvaluationCriteriaDtoSchema } from '../models/tasks/task.dto.schema';

@Injectable()
export class EvaluationService {
  private readonly logger = new Logger(EvaluationService.name);
  private taskService: TaskService;
  private visualizationService: VisualizationService;
  private parserService: ParserService;

  constructor(
    taskService: TaskService,
    visualizationService: VisualizationService,
    parserService: ParserService,
  ) {
    this.taskService = taskService;
    this.visualizationService = visualizationService;
    this.parserService = parserService;
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
    const rawSVG = await this.generateSVG(elements);

    return 'Empty';
  }

  private buildGradingObject(task: TaskSchema) {
    const grading = gradingSchema.parse(task.id);
    grading.grading.maxPoints = task.maxPoints;
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
    //TODO: Iterate over all evaluationCriteras and depending on the objects subtract points.
    for (const evaluationCriteria of task.additionalData.evaluationCriteria) {
      console.log('Here' + evaluationCriteria.toString());
    }
    return grading;
  }

  async persistEvaluationResult(
    submission: SubmissionSchema,
    grading: GradingSchema,
  ) {
    throw new Error('Method not implemented');
  }
}

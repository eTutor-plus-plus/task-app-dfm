import { Injectable, Logger } from '@nestjs/common';
import { SubmissionDataDtoSchema } from '../models/submissions/submission.dto.schema';
import { PrismaService } from '../prisma.service';
import { EvaluationService } from '../evaluation/evaluation.service';
import { TaskService } from '../task/task.service';
import { SubmissionService } from '../submission/submission.service';

@Injectable()
export class ExecutionService {
  private readonly logger = new Logger(ExecutionService.name);

  LOCATION: string = '%id%/result';

  constructor(
    private readonly prisma: PrismaService,
    private readonly taskService: TaskService,
    private readonly submissionService: SubmissionService,
    private readonly evaluationService: EvaluationService,
  ) {}

  async executeAndGradeAsync(
    submission: SubmissionDataDtoSchema,
  ): Promise<string> {
    const task = await this.taskService.find(submission.taskId);
    const createdSubmission =
      await this.submissionService.createSubmission(submission);

    // Not awaiting the evaluation here, as we want to return the location immediately
    this.evaluationService.evaluateSubmission(createdSubmission, task, true);

    return this.LOCATION.replace('%id%', createdSubmission.id);
  }

  async executeAndGradeSync(
    submission: SubmissionDataDtoSchema,
    persist: boolean,
  ) {
    const task = await this.taskService.find(submission.taskId);
    const createdSubmission =
      await this.submissionService.createSubmission(submission);

    return await this.evaluationService.evaluateSubmission(
      createdSubmission,
      task,
      persist,
    );
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { submissionDataDto } from '../models/schemas/submission.dto.schema';
import { PrismaService } from '../prisma.service';
import { EvaluationService } from '../evaluation/evaluation.service';
import { TaskService } from '../task/task.service';
import { SubmissionService } from '../submission/submission.service';

@Injectable()
export class ExecutionService {
  private readonly logger = new Logger(ExecutionService.name);
  private prisma: PrismaService;
  private taskService: TaskService;
  private submissionService: SubmissionService;
  private evaluationService: EvaluationService;

  LOCATION: string = '%id%/result';

  constructor(
    prisma: PrismaService,
    taskService: TaskService,
    submissionService: SubmissionService,
    evaluationService: EvaluationService,
  ) {
    this.prisma = prisma;
    this.taskService = taskService;
    this.submissionService = submissionService;
    this.evaluationService = evaluationService;
  }

  async executeAndGradeAsync(submission: submissionDataDto): Promise<string> {
    const isTaskIdValid = !!(await this.taskService.find(submission.taskId));
    if (!isTaskIdValid) {
      this.logger.error(
        'Invalid submission - could not find task with id: ',
        submission.taskId,
      );
      throw new Error('Invalid submission');
    }
    const submissionId =
      await this.submissionService.createSubmission(submission);

    this.evaluationService.evaluateSubmission(submissionId, true);
    return this.LOCATION.replace('%id%', submissionId);
  }

  async executeAndGradeSync(submission: submissionDataDto, persist: boolean) {
    const isTaskIdValid = !!(await this.taskService.find(submission.taskId));
    if (!isTaskIdValid) {
      this.logger.error(
        'Invalid submission - could not find task with id: ',
        submission.taskId,
      );
      throw new Error('Invalid submission');
    }
    const submissionId =
      await this.submissionService.createSubmission(submission);

    return await this.evaluationService.evaluateSubmission(
      submissionId,
      persist,
    );
  }
}

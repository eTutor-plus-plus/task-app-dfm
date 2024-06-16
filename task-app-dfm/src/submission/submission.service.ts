import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EvaluationService } from '../evaluation/evaluation.service';
import { CreateSubmissionDto } from '../models/dto/create-submission.dto';
import { TaskService } from '../task/task.service';

@Injectable()
export class SubmissionService {
  private readonly logger = new Logger(SubmissionService.name);
  private prisma: PrismaService;
  private evaluationService: EvaluationService;
  private taskService: TaskService;

  constructor(
    prisma: PrismaService,
    evaluationService: EvaluationService,
    taskService: TaskService,
  ) {
    this.prisma = prisma;
    this.evaluationService = evaluationService;
    this.taskService = taskService;
  }

  async executeAndGrade(
    submission: CreateSubmissionDto,
    runInBackground: boolean = false,
    persist: boolean = true,
  ): Promise<string> {
    const isTaskIdValid = !!(await this.taskService.find(submission.taskId));
    if (!submission || !isTaskIdValid) {
      this.logger.error('Invalid submission', submission);
      throw new Error('Invalid submission');
    }
    const submissionId = await this.createSubmission(submission);
    if (runInBackground) {
      this.evaluationService.evaluateSubmission(submissionId);
      return submissionId;
    }
    const result =
      await this.evaluationService.evaluateSubmission(submissionId);
    if (persist) {
      await this.evaluationService.persistEvaluationResult(
        submissionId,
        result,
      );
    }
  }

  async createSubmission(createSubmissionDto: CreateSubmissionDto) {
    if (!createSubmissionDto) {
      this.logger.error('Invalid submission', createSubmissionDto);
      throw new Error('Invalid submission');
    }
    try {
      const submission = await this.prisma.submissions.create({
        data: {
          userId: createSubmissionDto.userId,
          assignmentId: createSubmissionDto.assignmentId,
          taskId: createSubmissionDto.taskId,
          language: createSubmissionDto.language,
          feedbackLevel: createSubmissionDto.feedbackLevel,
          submission: {
            create: {
              input: createSubmissionDto.submission.input,
            },
          },
        },
      });
      return submission.id;
    } catch (error) {
      this.logger.error('Failed to create submission', error);
    }
  }

  async listAllSubmissions() {
    throw new Error('Method not implemented');
  }

  async findSubmissionById() {
    throw new Error('Method not implemented');
  }
}

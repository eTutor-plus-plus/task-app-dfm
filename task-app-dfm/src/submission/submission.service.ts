import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EvaluationService } from '../evaluation/evaluation.service';
import { TaskService } from '../task/task.service';
import { submissionDataDto } from '../models/schemas/submission.dto.schema';
import { SubmissionSchema } from '../models/schemas/submission.schema';
import { Optional } from '@prisma/client/runtime/library';

@Injectable()
export class SubmissionService {
  private readonly logger = new Logger(SubmissionService.name);
  private prisma: PrismaService;
  private evaluationService: EvaluationService;
  private taskService: TaskService;

  LOCATION: string = '/api/submission/%id%/result';

  constructor(
    prisma: PrismaService,
    evaluationService: EvaluationService,
    taskService: TaskService,
  ) {
    this.prisma = prisma;
    this.evaluationService = evaluationService;
    this.taskService = taskService;
  }

  //TODO split the submission service into two services to separate the submission CRUD operations from the execution logic

  async executeAndGradeAsync(
    submission: submissionDataDto,
    runInBackground: boolean = false,
    persist: boolean = true,
  ): Promise<string> {
    const isTaskIdValid = !!(await this.taskService.find(submission.taskId));
    if (!isTaskIdValid) {
      this.logger.error('Invalid submission', submission);
      throw new Error('Invalid submission');
    }
    const submissionId = await this.createSubmission(submission);
    if (runInBackground) {
      this.evaluationService.evaluateSubmission(submissionId, true);
      return this.LOCATION.replace('%id%', submissionId);
    }
    return await this.evaluationService.evaluateSubmission(
      submissionId,
      persist,
    );
  }

  async createSubmission(createSubmissionDto: submissionDataDto) {
    const submission = await this.prisma.submissions.create({
      data: {
        userId: createSubmissionDto.userId,
        assignmentId: createSubmissionDto.assignmentId,
        taskId: createSubmissionDto.taskId,
        language: createSubmissionDto.language,
        mode: createSubmissionDto.mode,
        feedbackLevel: createSubmissionDto.feedbackLevel,
        submission: {
          create: {
            input: createSubmissionDto.submission.input,
          },
        },
      },
    });
    return submission.id;
  }

  async findSubmissionById(
    submissionId: string,
  ): Promise<Optional<SubmissionSchema>> {
    return this.prisma.submissions.findUnique({
      where: {
        id: submissionId,
      },
    });
  }

  async listAllSubmissions() {
    throw new Error('Method not implemented');
  }
}

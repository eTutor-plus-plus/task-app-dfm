import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { EvaluationService } from '../evaluation/evaluation.service';
import { TaskService } from '../task/task.service';
import {
  SubmissionDataDtoSchema,
  submissionDataDtoSchema,
} from '../models/submissions/submission.dto.schema';
import { SubmissionSchema } from '../models/submissions/submission.schema';
import { Optional } from '@prisma/client/runtime/library';

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

  async createSubmission(createSubmissionDto: SubmissionDataDtoSchema) {
    const submission = await this.prisma.submissions.create({
      data: {
        userId: createSubmissionDto.userId,
        assignmentId: createSubmissionDto.assignmentId,
        task: {
          connect: {
            id: createSubmissionDto.taskId,
          },
        },
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
    return submission;
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

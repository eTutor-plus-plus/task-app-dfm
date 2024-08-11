import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SubmissionDataDtoSchema } from '../models/submissions/submission.dto.schema';
import { SubmissionSchema } from '../models/submissions/submission.schema';
import { Optional } from '@prisma/client/runtime/library';
import { EntityNotFoundError } from '../common/errors/entity-not-found.errors';
import { GradingSchema } from '../models/schemas/grading.dto.schema';
import { ResultNotAvailableError } from '../common/errors/result-not-available.error';

@Injectable()
export class SubmissionService {
  private readonly logger = new Logger(SubmissionService.name);

  constructor(private readonly prisma: PrismaService) {}

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
      include: {
        submission: true,
      },
    });
    return submission;
  }

  async findSubmissionById(
    submissionId: string,
  ): Promise<Optional<SubmissionSchema>> {
    const submission = this.prisma.submissions.findUnique({
      where: {
        id: submissionId,
      },
    });
    if (!submission) {
      this.logger.warn(`Submission with id ${submissionId} does not exist`);
      throw new EntityNotFoundError(
        `Submission with id ${submissionId} does not exist`,
      );
    }
    return submission;
  }

  async getGradingById(submissionId: string) {
    const submission = await this.prisma.submissions.findUnique({
      where: { id: submissionId },
    });
    if (!submission) {
      this.logger.warn(`Submission with id ${submissionId} does not exist`);
      throw new EntityNotFoundError(
        `Task with id ${submissionId} does not exist`,
      );
    }
    const task = await this.prisma.tasks.findUnique({
      where: {
        id: submission.taskId,
      },
    });

    const grading = await this.prisma.grading.findUnique({
      where: {
        submissionId: submissionId,
      },
      include: {
        gradingCriterias: true,
      },
    });

    if (!grading) {
      this.logger.debug(
        `Grading for submissionId ${submissionId} does not exist yet`,
      );
      throw new ResultNotAvailableError(
        `Grading for submissionId ${submissionId} does not exist yet`,
      );
    }

    return {
      maxPoints: task.maxPoints,
      points: grading.points,
      generalFeedback: grading.generalFeedback,
      criteria: grading.gradingCriterias,
    } as GradingSchema;
  }
  async listAllSubmissions() {
    throw new Error('Method not implemented');
  }

  async deleteSubmission(submissionId: string) {
    await this.prisma.submissions.delete({
      where: {
        id: submissionId,
      },
    });
  }
}

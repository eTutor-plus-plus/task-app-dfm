import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SubmissionDataDtoSchema } from '../models/submissions/submission.dto.schema';
import { SubmissionSchema } from '../models/submissions/submission.schema';
import { Optional } from '@prisma/client/runtime/library';
import { EntityNotFoundError } from '../common/errors/entity-not-found.errors';
import { GradingSchema } from '../models/schemas/grading.dto.schema';
import { ResultNotAvailableError } from '../common/errors/result-not-available.error';
import { SubmissionFilterSchema } from '../models/submissions/submission.filter.schema';

@Injectable()
export class SubmissionService {
  private readonly logger = new Logger(SubmissionService.name);
  private readonly GRADING_TIMEOUT = 1000;
  private readonly GRADING_MAX_RETRIES = 20;

  constructor(private readonly prisma: PrismaService) {}

  async createSubmission(
    createSubmissionDto: SubmissionDataDtoSchema,
    gradingAvailable: boolean,
  ) {
    return this.prisma.submissions.create({
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
        gradingAvailable: gradingAvailable,
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

  async findGradingById(submissionId: string) {
    let submission = await this.prisma.submissions.findUnique({
      where: { id: submissionId },
    });
    if (!submission) {
      this.logger.warn(`Submission with id ${submissionId} does not exist`);
      throw new EntityNotFoundError(
        `Task with id ${submissionId} does not exist`,
      );
    }
    let retries = 0;

    while (submission.gradingAvailable === false) {
      if (retries >= this.GRADING_MAX_RETRIES) {
        this.logger.warn(
          `Grading for submissionId ${submissionId} does not exist yet - maximum retries exceeded`,
        );
        throw new ResultNotAvailableError(
          `Grading for submissionId ${submissionId} does not exist yet - maximum retries exceeded`,
        );
      }
      this.logger.debug(
        `Grading for submissionId ${submissionId} does not exist yet - trying again in ${this.GRADING_TIMEOUT} milliseconds`,
      );
      await new Promise((resolve) => setTimeout(resolve, this.GRADING_TIMEOUT));
      submission = await this.prisma.submissions.findUnique({
        where: { id: submissionId },
      });
      retries++;
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
        gradingCriterias: {
          select: {
            name: true,
            points: true,
            passed: true,
            feedback: true,
          },
        },
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
  async findSubmissions(submissionFilter: SubmissionFilterSchema) {
    const filterConditions: any = this.buildFilterConditions(submissionFilter);
    const sortConditions = this.buildSortConditions(submissionFilter);
    const queryResult = await this.prisma.submissions.findMany({
      skip: submissionFilter.page * submissionFilter.size,
      take: submissionFilter.size,
      where: filterConditions,
      orderBy: sortConditions,
      select: {
        id: true,
        userId: true,
        assignmentId: true,
        taskId: true,
        language: true,
        mode: true,
        feedbackLevel: true,
        submissionId: false,
        submission: {
          select: {
            input: true,
          },
        },
        grading: {
          select: {
            points: true,
            generalFeedback: true,
            gradingCriterias: true,
            submission: {
              select: {
                task: {
                  select: {
                    maxPoints: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    const totalElements = await this.countSubmissions(submissionFilter);
    return {
      totalElements: totalElements,
      totalPages: Math.ceil(totalElements / submissionFilter.size),
      size: submissionFilter.size,
      number: submissionFilter.page,
      numberOfElements: queryResult.length,
      content: queryResult.map((submission) => ({
        ...submission,
        grading: submission.grading.map((grading) => {
          const { maxPoints } = grading.submission.task;
          return {
            ...grading,
            maxPoints,
            submission: undefined,
          };
        }),
      })),
    };
  }

  async countSubmissions(submissionFilter: SubmissionFilterSchema) {
    const filterConditions: any = this.buildFilterConditions(submissionFilter);
    return this.prisma.submissions.count({
      where: filterConditions,
    });
  }

  private buildFilterConditions(submissionFilter: SubmissionFilterSchema) {
    const filterConditions: any = {};
    if (submissionFilter.userFilter) {
      filterConditions.userId = submissionFilter.userFilter;
    }
    if (submissionFilter.taskFilter) {
      filterConditions.taskId = submissionFilter.taskFilter;
    }
    if (submissionFilter.assignmentFilter) {
      filterConditions.assignmentId = submissionFilter.assignmentFilter;
    }
    filterConditions.mode = submissionFilter.modeFilter;
    return filterConditions;
  }

  private buildSortConditions(submissionFilter: SubmissionFilterSchema) {
    return submissionFilter.sort.map((sort) => {
      const [field, order] = sort.split(',');
      return {
        [field]: order === 'desc' ? 'desc' : 'asc',
      };
    });
  }

  async deleteSubmission(submissionId: string) {
    await this.prisma.submissions.delete({
      where: {
        id: submissionId,
      },
    });
  }
}

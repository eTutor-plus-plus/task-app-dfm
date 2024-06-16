import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Task } from '../models/task/task';
import { Utils } from '../lib/utils/utils';
import { Optional } from '@prisma/client/runtime/library';
import { taskDto } from '../models/schemas/task.dto.schema';
import { tasks } from '@prisma/client';
import { TaskSchema } from '../models/schemas/task.schema';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  private prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(task: taskDto, id: number): Promise<Optional<TaskSchema>> {
    try {
      const createdTask = await this.prisma.tasks.create({
        data: {
          id: id,
          taskGroupId: task.taskGroupId,
          maxPoints: task.maxPoints,
          taskType: task.taskType,
          status: task.status,
          additionalData: {
            create: {
              solution: task.additionalData.solution,
            },
          },
        },
        include: {
          additionalData: true,
        },
      });
      return createdTask as TaskSchema;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          'Could not create task. Error message: ' + error.message,
        );
        throw new Error(
          'Could not create task. Error message: ' + error.message,
        );
      } else {
        throw new Error('Could not create task');
      }
    }
  }

  async update(task: taskDto, id: number): Promise<Optional<TaskSchema>> {
    try {
      const updatedTask: tasks = await this.prisma.tasks.update({
        where: {
          id: id,
        },
        data: {
          taskGroupId: task.taskGroupId,
          maxPoints: task.maxPoints,
          taskType: task.taskType,
          status: task.status,
          additionalData: {
            update: {
              solution: task.additionalData.solution,
            },
          },
        },
        include: {
          additionalData: true,
        },
      });
      return updatedTask as TaskSchema;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(
          'Could not update task. Error message: ' + error.message,
        );
        throw new Error(
          'Could not update task. Error message: ' + error.message,
        );
      } else {
        throw new Error('Could not update task');
      }
    }
  }

  async find(taskId: number): Promise<Optional<TaskSchema>> {
    try {
      const task = await this.prisma.tasks.findUnique({
        where: {
          id: taskId,
        },
        include: {
          additionalData: true, // Include the additionalData relation
        },
      });

      return task as TaskSchema;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          'Could not find task. Error message: ' + error.message,
        );
        throw new Error('Could not find task. Error message: ' + error.message);
      } else {
        throw new Error('Could not find task');
      }
    }
  }

  delete(id: number) {
    try {
      this.prisma.tasks.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          'Could not delete task. Error message: ' + error.message,
        );
        throw new Error(
          'Could not delete task. Error message: ' + error.message,
        );
      } else {
        throw new Error('Could not delete task');
      }
    }
  }
}

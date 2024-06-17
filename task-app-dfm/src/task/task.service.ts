import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
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
    const task = await this.prisma.tasks.findUnique({
      where: {
        id: taskId,
      },
      include: {
        additionalData: true,
      },
    });
    return task as TaskSchema;
  }

  delete(id: number) {
    this.prisma.tasks.delete({
      where: {
        id: id,
      },
    });
  }
}

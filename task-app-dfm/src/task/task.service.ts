import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Task } from '../models/task/task';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  private prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(task: Task) {
    if (!task) {
      this.logger.error('Task is required');
      throw new Error('Task is required');
    }
    try {
      return await this.prisma.tasks.create({
        data: {
          id: task.id,
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
      });
    } catch (error) {
      this.logger.error(
        'Could not create task. Error message: ' + error.message,
      );
      throw new Error('Could not create task. Error message: ' + error.message);
    }
  }

  async update(task: Task) {
    if (!task) {
      this.logger.error('Task is required');
      throw new Error('Task is required');
    }
    try {
      return await this.prisma.tasks.update({
        where: {
          id: task.id,
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
      });
    } catch (error) {
      this.logger.error(
        'Could not update task. Error message: ' + error.message,
      );
      throw new Error('Could not update task. Error message: ' + error.message);
    }
  }

  async find(id: number) {
    if (!id) {
      this.logger.error('Task id is required');
      throw new Error('Task id is required');
    }
    try {
      const additionalData = await this.prisma.additionalData.findUnique({
        where: {
          id: id,
        },
      });

      //TODO return additionalData DTO object
      return additionalData;
    } catch (error) {
      this.logger.error('Could not find task. Error message: ' + error.message);
      throw new Error('Could not find task. Error message: ' + error.message);
    }
  }

  delete(id: number) {
    if (!id) {
      this.logger.error('Task id is required');
      throw new Error('Task id is required');
    }
    try {
      this.prisma.tasks.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      this.logger.error(
        'Could not delete task. Error message: ' + error.message,
      );
      throw new Error('Could not delete task. Error message: ' + error.message);
    }
  }
}

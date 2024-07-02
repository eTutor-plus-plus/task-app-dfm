import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Optional } from '@prisma/client/runtime/library';
import { taskDto } from '../models/schemas/task.dto.schema';
import { tasks } from '@prisma/client';
import { TaskSchema } from '../models/schemas/task.schema';
import { EntityNotFoundError } from '../common/errors/entity-not-found.errors';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  private prisma: PrismaService;

  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async create(task: taskDto, id: number): Promise<Optional<TaskSchema>> {
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
  }

  async update(task: taskDto, id: number): Promise<Optional<TaskSchema>> {
    const taskExists = !!(await this.find(id));
    if (!taskExists) {
      this.logger.warn(`Task with id ${id} does not exist`);
      throw new EntityNotFoundError(`Task with id ${id} does not exist`);
    }
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
  }

  async find(id: number): Promise<Optional<TaskSchema>> {
    const task = await this.prisma.tasks.findUnique({
      where: {
        id: id,
      },
      include: {
        additionalData: true,
      },
    });
    if (!task) {
      this.logger.warn(`Task with id ${id} does not exist`);
      throw new EntityNotFoundError(`Task with id ${id} does not exist`);
    }
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

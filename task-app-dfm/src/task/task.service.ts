import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Optional } from '@prisma/client/runtime/library';
import { taskDto } from '../models/schemas/task.dto.schema';
import { tasks } from '@prisma/client';
import { TaskSchema } from '../models/schemas/task.schema';
import { EntityNotFoundError } from '../common/errors/entity-not-found.errors';
import { InvalidPointsError } from '../common/errors/invalid-points.error';
import { ParserService } from '../parser/parser.service';
import { AbstractElement } from '../models/ast/abstractElement';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  private prisma: PrismaService;
  private parserService: ParserService;

  constructor(prisma: PrismaService, parserService: ParserService) {
    this.prisma = prisma;
    this.parserService = parserService;
  }

  async create(task: taskDto, id: number): Promise<Optional<TaskSchema>> {
    this.validateTaskPoints(task);
    const abstractSyntaxTree = this.parserService.getAST(
      task.additionalData.solution,
    );
    const parsedCriterias: AbstractElement[] = [];
    for (const criteria of task.additionalData.evaluationCriteria) {
      const criteriaAST = this.parserService.getAST(criteria.subtree);
      parsedCriterias.push(...criteriaAST);
    }
    const uniqueNames =
      this.parserService.extractUniqueNamesFromAST(abstractSyntaxTree);
    const createdTask = await this.prisma.$transaction(async () => {
      const createdAdditionalData = await this.prisma.additionalData.create({
        data: {
          solution: task.additionalData.solution,
          abstractSyntaxTree: JSON.stringify(abstractSyntaxTree),
        },
      });

      for (let i = 0; i < task.additionalData.evaluationCriteria.length; i++) {
        const criteria = task.additionalData.evaluationCriteria[i];
        const parsedCriteria = parsedCriterias[i];
        await this.prisma.evaluationCriteria.create({
          data: {
            name: criteria.name,
            points: criteria.points,
            subtree: criteria.subtree,
            abstractSyntaxTree: JSON.stringify(parsedCriteria),
            additionalDataId: createdAdditionalData.id,
          },
        });
      }

      return this.prisma.tasks.create({
        data: {
          id: id,
          taskGroupId: task.taskGroupId,
          maxPoints: task.maxPoints,
          taskType: task.taskType,
          status: task.status,
          additionalDataId: createdAdditionalData.id,
          uniqueNames: Array.from(uniqueNames),
        },
        include: {
          additionalData: {
            include: {
              evaluationCriteria: true,
            },
          },
        },
      });
    });

    return createdTask as TaskSchema;
  }

  private validateTaskPoints(task: taskDto) {
    const subTreePoints = task.additionalData.evaluationCriteria.reduce(
      (acc, criteria) => acc + criteria.points,
      0,
    );
    if (subTreePoints !== task.maxPoints) {
      this.logger.warn(
        `Task points do not match the sum of evaluation criteria points`,
      );
      throw new InvalidPointsError(
        `Task points do not match the sum of evaluation criteria points`,
      );
    }
  }

  async update(task: taskDto, id: number): Promise<Optional<TaskSchema>> {
    const taskExists = !!(await this.find(id));
    if (!taskExists) {
      this.logger.warn(`Task with id ${id} does not exist`);
      throw new EntityNotFoundError(`Task not found`);
    }
    this.validateTaskPoints(task);
    const abstractSyntaxTree = this.parserService.getAST(
      task.additionalData.solution,
    );
    const parsedCriterias: AbstractElement[] = [];
    for (const criteria of task.additionalData.evaluationCriteria) {
      const criteriaAST = this.parserService.getAST(criteria.subtree);
      parsedCriterias.push(...criteriaAST);
    }
    const uniqueNames =
      this.parserService.extractUniqueNamesFromAST(abstractSyntaxTree);
    const updatedTask = await this.prisma.$transaction(async () => {
      const updatedTask: tasks = await this.prisma.tasks.update({
        where: {
          id: id,
        },
        data: {
          taskGroupId: task.taskGroupId,
          maxPoints: task.maxPoints,
          taskType: task.taskType,
          status: task.status,
          uniqueNames: Array.from(uniqueNames),
          additionalData: {
            update: {
              solution: task.additionalData.solution,
              abstractSyntaxTree: JSON.stringify(abstractSyntaxTree),
              evaluationCriteria: {
                deleteMany: {},
              },
            },
          },
        },
        include: {
          additionalData: true,
        },
      });

      for (let i = 0; i < task.additionalData.evaluationCriteria.length; i++) {
        const criteria = task.additionalData.evaluationCriteria[i];
        const parsedCriteria = parsedCriterias[i];
        await this.prisma.evaluationCriteria.create({
          data: {
            name: criteria.name,
            points: criteria.points,
            subtree: criteria.subtree,
            abstractSyntaxTree: JSON.stringify(parsedCriteria),
            additionalDataId: updatedTask.additionalDataId,
          },
        });
      }

      return await this.find(id);
    });
    return updatedTask as TaskSchema;
  }

  async find(id: number): Promise<Optional<TaskSchema>> {
    const task = await this.prisma.tasks.findUnique({
      where: {
        id: id,
      },
      include: {
        additionalData: {
          include: {
            evaluationCriteria: true,
          },
        },
      },
    });
    if (!task) {
      this.logger.warn(`Task with id ${id} does not exist`);
      throw new EntityNotFoundError(`Task with id ${id} does not exist`);
    }
    return task as TaskSchema;
  }

  async delete(id: number) {
    await this.prisma.tasks.delete({
      where: {
        id: id,
      },
    });
  }
}

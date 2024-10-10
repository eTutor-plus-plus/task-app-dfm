import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import {
  taskDtoSchema,
  TaskDtoSchema,
  TaskDto,
  additionalDataDtoSchema,
} from '../models/tasks/task.dto.schema';
import { Response } from 'express';
import { TaskSchema } from '../models/tasks/task.schema';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':id')
  @ApiBody({ type: TaskDto, required: true })
  async create(
    @Body(new ZodValidationPipe(taskDtoSchema)) taskDto: TaskDtoSchema,
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    const location = `/api/task/${id}`;
    const task = await this.taskService.create(taskDto, id);
    res.status(HttpStatus.CREATED).location(location).send(task);
  }

  @Put(':id')
  @ApiBody({ type: TaskDto, required: true })
  async update(
    @Body(new ZodValidationPipe(taskDtoSchema)) taskDto: TaskDtoSchema,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const task = await this.taskService.update(taskDto, id);
    return taskDtoSchema.parse(task);
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number) {
    const task = (await this.taskService.find(id)) as TaskSchema;
    return additionalDataDtoSchema.parse(task.additionalData);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.taskService.delete(id);
    return;
  }
}

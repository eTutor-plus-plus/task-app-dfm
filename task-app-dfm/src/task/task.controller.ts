import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
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
  taskDto,
  TaskDto,
  additionalDataDtoSchema,
} from '../models/schemas/task.dto.schema';
import { Response } from 'express';

@ApiTags('task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':id')
  @ApiBody({ type: TaskDto, required: true })
  async create(
    @Body(new ZodValidationPipe(taskDtoSchema)) taskDto: taskDto,
    @Param('id', ParseIntPipe) id: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    const location = `${id}`;
    let task = await this.taskService.create(taskDto, id);
    task = taskDtoSchema.parse(task);
    res.status(HttpStatus.CREATED).location(location).send(task);
  }

  @Put(':id')
  @ApiBody({ type: TaskDto, required: true })
  async update(
    @Body(new ZodValidationPipe(taskDtoSchema)) taskDto: taskDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const task = await this.taskService.update(taskDto, id);
    return taskDtoSchema.parse(task);
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number) {
    const task = await this.taskService.find(id);
    return additionalDataDtoSchema.parse(task.additionalData);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseIntPipe) id: number) {
    this.taskService.delete(id);
    return;
  }
}

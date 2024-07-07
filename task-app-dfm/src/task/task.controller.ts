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
    try {
      const location = `${id}`;
      let task = await this.taskService.create(taskDto, id);
      task = taskDtoSchema.parse(task);
      res.status(HttpStatus.CREATED).location(location).send(task);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Put(':id')
  @ApiBody({ type: TaskDto, required: true })
  update(
    @Body(new ZodValidationPipe(taskDtoSchema)) task: taskDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      return this.taskService.update(task, id);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number) {
    const task = await this.taskService.find(id);
    if (task?.additionalData) {
      return additionalDataDtoSchema.parse(task.additionalData);
    } else {
      throw new NotFoundException();
    }
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', ParseIntPipe) id: number) {
    try {
      this.taskService.delete(id);
      return;
    } catch (error) {
      return BadRequestException;
    }
  }
}

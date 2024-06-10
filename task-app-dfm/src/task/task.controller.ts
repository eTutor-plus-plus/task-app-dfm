import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Task } from '../models/task/task';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':id')
  create(@Body() task: Task, @Param('id') id: string) {
    try {
      task.id = parseInt(id);
      return this.taskService.create(task);
    } catch (error) {
      return BadRequestException;
    }
  }

  @Put(':id')
  update(@Body() task: Task, @Param('id') id: string) {
    try {
      task.id = parseInt(id);
      return this.taskService.update(task);
    } catch (error) {
      return BadRequestException;
    }
  }

  @Get(':id')
  find(@Param('id') id: string) {
    try {
      return this.taskService.find(parseInt(id));
    } catch (error) {
      return BadRequestException;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    try {
      this.taskService.delete(parseInt(id));
      return;
    } catch (error) {
      return BadRequestException;
    }
  }
}

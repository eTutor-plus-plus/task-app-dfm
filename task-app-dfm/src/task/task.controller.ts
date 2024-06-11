import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Task } from '../models/task/task';
import { TaskService } from './task.service';
import { TaskDto } from '../models/dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':id')
  async create(@Body() task: Task, @Param('id') id: string) {
    try {
      task.id = parseInt(id);
      return await this.taskService.create(task);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Put(':id')
  update(@Body() task: Task, @Param('id') id: string) {
    try {
      task.id = parseInt(id);
      return this.taskService.update(task);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    try {
      const additionalData = await this.taskService.find(parseInt(id));
      return new TaskDto(additionalData.solution);
    } catch (error) {
      throw new NotFoundException();
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

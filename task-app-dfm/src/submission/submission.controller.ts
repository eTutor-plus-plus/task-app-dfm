import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotImplementedException,
  Post,
} from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmission } from '../models/dto/create-submission';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('submission')
@Controller('submission')
export class SubmissionController {
  constructor(private readonly taskService: SubmissionService) {}

  @Post('submission')
  async create(@Body() submission: CreateSubmission) {
    try {
      throw new NotImplementedException(submission);
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get('submission')
  async listAllSubmissions() {
    try {
      throw new NotImplementedException();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get('submission/:id/result')
  async findSubmissionById() {
    try {
      throw new NotImplementedException();
    } catch (error) {
      throw new BadRequestException();
    }
  }
}

import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  ParseBoolPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  SubmissionData,
  submissionDataDto,
  submissionDataDtoSchema,
} from '../models/submissions/submission.dto.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { ExecutionService } from '../execution/execution.service';
import { Response } from 'express';

@ApiTags('submission')
@Controller('submission')
export class SubmissionController {
  constructor(
    private readonly taskService: SubmissionService,
    private readonly executionService: ExecutionService,
  ) {}

  @Post()
  @ApiBody({ type: SubmissionData, required: true })
  @HttpCode(HttpStatus.OK)
  async executeAndGrade(
    @Body(new ZodValidationPipe(submissionDataDtoSchema))
    submission: submissionDataDto,
    @Query('runInBackground', ParseBoolPipe) runInBackground: boolean = false,
    @Query('persist', ParseBoolPipe) persist: boolean = true,
    @Res({ passthrough: true }) res: Response,
  ) {
    if (runInBackground) {
      const location =
        await this.executionService.executeAndGradeAsync(submission);
      res
        .status(HttpStatus.ACCEPTED)
        .location(location)
        .type('text/plain')
        .send(location);
      return;
    }

    return this.executionService.executeAndGradeSync(submission, persist);
  }

  @Get('submission/:id/result')
  async findSubmissionById() {
    try {
      throw new NotImplementedException();
    } catch (error) {
      throw new BadRequestException();
    }
  }

  @Get('submission')
  async listSubmissions() {
    try {
      throw new NotImplementedException();
    } catch (error) {
      throw new BadRequestException();
    }
  }
}

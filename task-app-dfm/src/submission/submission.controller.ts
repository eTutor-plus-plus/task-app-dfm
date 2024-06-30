import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotImplementedException,
  Param,
  ParseBoolPipe,
  Post,
} from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  SubmissionData,
  submissionDataDto,
  submissionDataDtoSchema,
} from '../models/schemas/submission.dto.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { ExecutionService } from '../execution/execution.service';

@ApiTags('submission')
@Controller('submission')
export class SubmissionController {
  constructor(
    private readonly taskService: SubmissionService,
    private readonly executionService: ExecutionService,
  ) {}

  @Post('submission')
  @ApiBody({ type: SubmissionData, required: true })
  async executeAndGrade(
    @Body(new ZodValidationPipe(submissionDataDtoSchema))
    submission: submissionDataDto,
    @Param('runInBackground', ParseBoolPipe) runInBackground: boolean = false,
    @Param('persist', ParseBoolPipe) persist: boolean = true,
  ) {
    try {
      return this.executionService.executeAndGradeAsync(
        submission,
        runInBackground,
        persist,
      );
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

  @Get('submission/:id/result')
  async findSubmissionById() {
    try {
      throw new NotImplementedException();
    } catch (error) {
      throw new BadRequestException();
    }
  }
}

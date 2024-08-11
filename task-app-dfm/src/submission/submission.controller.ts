import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Param,
  ParseBoolPipe,
  Post,
  Query,
  Res,
  Headers,
  ParseIntPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  SubmissionData,
  SubmissionDataDtoSchema,
  submissionDataDtoSchema,
} from '../models/submissions/submission.dto.schema';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { ExecutionService } from '../execution/execution.service';
import { Response } from 'express';
import { Mode } from '@prisma/client';

@ApiTags('submission')
@Controller('submission')
export class SubmissionController {
  constructor(
    private readonly submissionService: SubmissionService,
    private readonly executionService: ExecutionService,
  ) {}

  @Post()
  @ApiBody({ type: SubmissionData, required: true })
  @HttpCode(HttpStatus.OK)
  async executeAndGrade(
    @Body(new ZodValidationPipe(submissionDataDtoSchema))
    submission: SubmissionDataDtoSchema,
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

  @Get('/:id/result')
  async findSubmissionById(
    @Param('id') id: string,
    @Query('delete', ParseBoolPipe) deleteSubmision: boolean,
    @Headers() headers: Headers,
  ) {
    //TODO: Check headers for default value of timeout and also include flag to set when result is still being processed/not available
    console.log(headers);
    const submissionResult = this.submissionService.getGradingById(id);
    if (deleteSubmision) {
      await this.submissionService.deleteSubmission(id);
    }
    return submissionResult;
  }

  @Get()
  async listSubmissions(
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
    @Query('sort') sort: string[],
    @Query('useFilter') useFilter: string,
    @Query('taskFilter', ParseIntPipe) taskFilter: number,
    @Query('assignmentFilter') assignmentFilter: string,
    @Query('modeFilter', new ParseEnumPipe(Mode)) modeFilter: Mode,
  ) {
    //TODO: Implement this behavior
    throw new NotImplementedException();
  }
}

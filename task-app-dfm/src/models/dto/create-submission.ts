import { Language } from '../../lib/utils/languages';
import { SubmissionMode } from '../enums/submissionMode';
import { Submission } from './submission';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSubmission {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  assignmentId: string;

  @ApiProperty()
  taskId: number;

  @ApiProperty({ enum: Language, enumName: 'Language' })
  language: Language;

  @ApiProperty({ enum: SubmissionMode, enumName: 'SubmissionMode' })
  mode: SubmissionMode;

  @ApiProperty()
  feedbackLevel: number;

  @ApiProperty({ type: Submission })
  submission: Submission;
}

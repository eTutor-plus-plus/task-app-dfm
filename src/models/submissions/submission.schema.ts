import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import {
  submissionDataDtoSchema,
  submissionDtoSchema,
} from './submission.dto.schema';

export const submissionSchema = submissionDtoSchema.extend({
  id: z.string().uuid(),
});

export const submissionDataSchema = submissionDataDtoSchema.extend({
  id: z.string().uuid(),
  submission: submissionDtoSchema,
});

export type SubmissionSchema = z.infer<typeof submissionSchema>;
export class Submission extends createZodDto(submissionSchema) {}
export type SubmissionDataSchema = z.infer<typeof submissionDataSchema>;
export class SubmissionData extends createZodDto(submissionDataSchema) {}

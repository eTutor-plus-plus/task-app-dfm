import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { submissionDtoSchema } from './submission.dto.schema';

export const submissionSchema = submissionDtoSchema.extend({
  id: z.string().uuid(),
});

export type SubmissionSchema = z.infer<typeof submissionSchema>;
export class Submission extends createZodDto(submissionSchema) {}

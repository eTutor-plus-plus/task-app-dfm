import { z } from 'zod';
import { Language, Mode } from '@prisma/client';
import { createZodDto } from '@anatine/zod-nestjs';

export const submissionDtoSchema = z.object({
  input: z.string(),
});

export const submissionDataDtoSchema = z.object({
  userId: z.string().max(255),
  assignmentId: z.string().max(255),
  taskId: z.number(),
  language: z.nativeEnum(Language),
  mode: z.nativeEnum(Mode),
  feedbackLevel: z.number().min(0).max(3),
  submission: submissionDtoSchema,
});

export type SubmissionDataDtoSchema = z.infer<typeof submissionDataDtoSchema>;
export class SubmissionData extends createZodDto(submissionDataDtoSchema) {}
export type SubmissionDto = z.infer<typeof submissionDtoSchema>;
export class Submission extends createZodDto(submissionDtoSchema) {}

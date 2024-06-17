import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const gradingSchema = z.object({
  submissionId: z.string().uuid(),
  grading: z.object({
    maxPoints: z.number(),
    points: z.number(),
    generalFeedback: z.string(),
  }),
});

export type grading = z.infer<typeof gradingSchema>;
export class Grading extends createZodDto(gradingSchema) {}

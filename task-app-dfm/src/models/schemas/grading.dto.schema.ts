import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const gradingSchema = z.object({
  submissionId: z.string().uuid(),
  grading: z.object({
    maxPoints: z.number().default(0),
    points: z.number().default(0),
    generalFeedback: z.string(),
  }),
});

export type GradingSchema = z.infer<typeof gradingSchema>;
export class Grading extends createZodDto(gradingSchema) {}

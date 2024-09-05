import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const gradingCriteriaSchema = z.object({
  name: z.string(),
  points: z.number(),
  passed: z.boolean(),
  feedback: z.string(),
});

export const gradingSchema = z.object({
  submissionId: z.string().uuid(),
  grading: z.object({
    maxPoints: z.number().default(0),
    points: z.number().default(0),
    generalFeedback: z.string().optional(),
    criteria: z.array(gradingCriteriaSchema),
  }),
});

export type GradingSchema = z.infer<typeof gradingSchema>;
export class Grading extends createZodDto(gradingSchema) {}
export type GradingCriteriaSchema = z.infer<typeof gradingCriteriaSchema>;
export class GradingCriteria extends createZodDto(gradingCriteriaSchema) {}

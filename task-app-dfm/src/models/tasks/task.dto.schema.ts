import { z } from 'zod';
import { Status } from '@prisma/client';
import { createZodDto } from '@anatine/zod-nestjs';

export const evaluationCriteriaDtoSchema = z.object({
  name: z.string().optional(),
  points: z.number().min(0),
  subtree: z.string(),
});

export const additionalDataDtoSchema = z.object({
  solution: z.string(),
  descriptionDe: z.string().optional(),
  descriptionEn: z.string().optional(),
  difficulty: z.number().min(0).max(3),
  evaluationCriteria: z.array(evaluationCriteriaDtoSchema),
});

export const taskDtoSchema = z
  .object({
    taskGroupId: z.number().nullable(),
    maxPoints: z.number().min(0.01),
    taskType: z.string(),
    status: z.nativeEnum(Status),
    additionalData: additionalDataDtoSchema,
  })
  .required();

export type TaskDtoSchema = z.infer<typeof taskDtoSchema>;
export class TaskDto extends createZodDto(taskDtoSchema) {}
export type AdditionalDataDtoSchema = z.infer<typeof additionalDataDtoSchema>;
export class AdditionalDataDto extends createZodDto(additionalDataDtoSchema) {}
export type EvaluationCriteriaDtoSchema = z.infer<
  typeof evaluationCriteriaDtoSchema
>;
export class EvaluationCriteriaDto extends createZodDto(
  evaluationCriteriaDtoSchema,
) {}

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
  evaluationCriteria: z.array(evaluationCriteriaDtoSchema),
});

export const taskDtoSchema = z
  .object({
    taskGroupId: z.number().nullable(),
    maxPoints: z.number().min(0),
    taskType: z.string(),
    status: z.nativeEnum(Status),
    additionalData: additionalDataDtoSchema,
  })
  .required();

export type taskDto = z.infer<typeof taskDtoSchema>;
export class TaskDto extends createZodDto(taskDtoSchema) {}
export type AdditionalDataDto = z.infer<typeof additionalDataDtoSchema>;
export class AdditionalData extends createZodDto(additionalDataDtoSchema) {}
export type EvaluationCriteriaDto = z.infer<typeof evaluationCriteriaDtoSchema>;
export class EvaluationCriteria extends createZodDto(
  evaluationCriteriaDtoSchema,
) {}

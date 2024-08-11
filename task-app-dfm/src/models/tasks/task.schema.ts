import { string, z } from 'zod';
import {
  additionalDataDtoSchema,
  evaluationCriteriaDtoSchema,
  taskDtoSchema,
} from './task.dto.schema';
import { createZodDto } from '@anatine/zod-nestjs';

export const evaluationCriteriaSchema = evaluationCriteriaDtoSchema.extend({
  abstractSyntaxTree: z.string(),
});
export const additionalDataSchema = additionalDataDtoSchema.extend({
  evaluationCriteria: z.array(evaluationCriteriaSchema),
  abstractSyntaxTree: z.string(),
});

export const taskSchema = taskDtoSchema.extend({
  id: z.number(),
  uniqueNames: z.array(string()).optional(),
  additionalData: additionalDataSchema,
});

export type TaskSchema = z.infer<typeof taskSchema>;
export class Task extends createZodDto(taskSchema) {}
export type AdditionalDataSchema = z.infer<typeof additionalDataSchema>;
export class AdditionalData extends createZodDto(additionalDataSchema) {}
export type EvaluationCriteriaSchema = z.infer<typeof evaluationCriteriaSchema>;
export class EvaluationCriteria extends createZodDto(
  evaluationCriteriaSchema,
) {}

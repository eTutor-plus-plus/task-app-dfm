import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';

export const taskResponseDtoSchema = z
  .object({
    descriptionDe: z.string().optional(),
    descriptionEn: z.string().optional(),
    difficulty: z.number().min(0).max(3),
    maxPoints: z.number().min(0.01),
  })
  .required();

export type TaskResponseDtoSchema = z.infer<typeof taskResponseDtoSchema>;
export class TaskResponseDto extends createZodDto(taskResponseDtoSchema) {}

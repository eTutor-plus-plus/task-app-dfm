import { z } from 'zod';
import { Status } from '@prisma/client';
import { createZodDto } from '@anatine/zod-nestjs';

export const additionalDataDtoSchema = z.object({
  solution: z.string(),
});

export const taskDtoSchema = z
  .object({
    taskGroupId: z.number().nullable(),
    maxPoints: z.number(),
    taskType: z.string(),
    status: z.nativeEnum(Status),
    additionalData: additionalDataDtoSchema,
  })
  .required();

export type taskDto = z.infer<typeof taskDtoSchema>;
export class TaskDto extends createZodDto(taskDtoSchema) {}
export type AdditionalDataDto = z.infer<typeof additionalDataDtoSchema>;
export class AdditionalData extends createZodDto(additionalDataDtoSchema) {}

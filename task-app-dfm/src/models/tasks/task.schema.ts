import { z } from 'zod';
import { taskDtoSchema } from './task.dto.schema';
import { createZodDto } from '@anatine/zod-nestjs';

export const taskSchema = taskDtoSchema.extend({
  id: z.number(),
});

export type TaskSchema = z.infer<typeof taskSchema>;
export class Task extends createZodDto(taskSchema) {}

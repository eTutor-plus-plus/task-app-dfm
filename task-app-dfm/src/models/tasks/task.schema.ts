import { string, z } from 'zod';
import { taskDtoSchema } from './task.dto.schema';
import { createZodDto } from '@anatine/zod-nestjs';

export const taskSchema = taskDtoSchema.extend({
  id: z.number(),
  uniqueNames: z.array(string()).optional(),
});

export type TaskSchema = z.infer<typeof taskSchema>;
export class Task extends createZodDto(taskSchema) {}

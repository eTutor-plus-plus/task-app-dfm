import { z } from 'zod';
import { Mode } from '@prisma/client';
import { createZodDto } from '@anatine/zod-nestjs';
import { submissionDataDtoSchema } from './submission.dto.schema';

const submissionDataProperties = Object.keys(submissionDataDtoSchema.shape);
const sortSchema = z
  .string()
  .regex(new RegExp(`^(${submissionDataProperties.join('|')})(,(asc|desc))?$`));
const sortArraySchema = z.preprocess((val) => {
  if (Array.isArray(val)) return val;
  return val !== undefined && val !== null ? [val] : [];
}, z.array(sortSchema));

export const submissionFilterSchema = z.object({
  page: z.coerce.number().int().nonnegative().default(0),
  size: z.coerce.number().int().positive().default(20),
  sort: sortArraySchema,
  userFilter: z.string().max(255).nullable().default(null),
  taskFilter: z.coerce.number().int().positive().nullable().default(null),
  assignmentFilter: z.string().max(255).nullable().default(null),
  modeFilter: z.nativeEnum(Mode),
});

export type SubmissionFilterSchema = z.infer<typeof submissionFilterSchema>;
export class SubmissionFilter extends createZodDto(submissionFilterSchema) {}

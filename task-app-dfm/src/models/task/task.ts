import { Status } from '../enums/status';
import { additionalData } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { AdditionalData } from './additionalData';

export class Task {
  id: number;

  @ApiProperty()
  taskGroupId: number;

  @ApiProperty()
  maxPoints: number;

  @ApiProperty()
  taskType: string;

  @ApiProperty({ enum: Status })
  status: Status;

  @ApiProperty({ type: () => AdditionalData })
  additionalData: additionalData;
}

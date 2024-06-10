import { ApiProperty } from '@nestjs/swagger';

export class AdditionalData {
  id?: number;

  @ApiProperty()
  solution: string;
}

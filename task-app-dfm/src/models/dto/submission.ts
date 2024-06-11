import { ApiProperty } from '@nestjs/swagger';

export class Submission {
  @ApiProperty()
  input: string;
}

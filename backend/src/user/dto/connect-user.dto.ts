import { ApiProperty } from '@nestjs/swagger';

export class ConnectUserDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  email?: string;
}

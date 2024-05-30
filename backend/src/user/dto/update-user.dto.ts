import { Provider } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  email?: string;

  @ApiProperty()
  name?: string;

  @ApiProperty({ enum: Provider })
  provider?: Provider;
}

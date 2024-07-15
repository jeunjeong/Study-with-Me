import { Provider } from 'prisma/generated/postgresql';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: Provider })
  provider: Provider;
}

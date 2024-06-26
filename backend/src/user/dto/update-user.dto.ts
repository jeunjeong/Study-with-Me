import { Provider } from 'prisma/generated/postgresql';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  email?: string;
  name?: string;
  @ApiProperty({ enum: Provider })
  provider?: Provider;
}

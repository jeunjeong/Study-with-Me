import { ApiProperty } from '@nestjs/swagger';
import { Provider } from 'prisma/generated/postgresql';

export class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ enum: Provider })
  provider: Provider;
}

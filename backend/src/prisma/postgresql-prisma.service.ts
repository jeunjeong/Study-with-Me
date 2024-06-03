import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from 'prisma/generated/postgresql';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get('PostgreSQL_URL'),
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}

import { Global, Module } from '@nestjs/common';
import { PrismaService as PostgreSQLService } from './postgresql-prisma.service';
import { PrismaService as MongoDBService } from './mongodb-prisma.service';

@Global()
@Module({
  providers: [PostgreSQLService, MongoDBService],
  exports: [PostgreSQLService, MongoDBService],
})
export class PrismaModule {}

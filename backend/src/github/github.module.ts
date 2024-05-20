import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GithubController } from './github.controller';
import { GithubService } from './github.service';

@Module({
  imports: [HttpModule],
  controllers: [GithubController],
  providers: [GithubService],
})
export class GithubModule {}

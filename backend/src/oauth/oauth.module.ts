import { Module } from '@nestjs/common';
import { KakaoModule } from 'src/kakao/kakao.module';
import { GithubModule } from 'src/github/github.module';
import { RouterModule } from '@nestjs/core';

const path = 'oauth';

@Module({
  imports: [
    KakaoModule,
    GithubModule,
    RouterModule.register([
      { path, module: KakaoModule },
      { path, module: GithubModule },
    ]),
  ],
  // imports: [
  //   KakaoModule,
  //   GithubModule,
  // ],
})
export class OauthModule {}

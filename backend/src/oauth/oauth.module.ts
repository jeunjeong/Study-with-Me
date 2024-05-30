import { Module } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { OauthController } from './oauth.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { GithubStrategy } from './strategy/github.strategy';

@Module({
  imports: [AuthModule, PassportModule],
  providers: [OauthService, KakaoStrategy, GithubStrategy],
  controllers: [OauthController],
})
export class OauthModule {}

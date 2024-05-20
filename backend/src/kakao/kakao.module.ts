import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KakaoService } from './kakao.service';
import { KakaoController } from './kakao.controller';

@Module({
  imports: [HttpModule],
  controllers: [KakaoController],
  providers: [KakaoService],
})
export class KakaoModule {}

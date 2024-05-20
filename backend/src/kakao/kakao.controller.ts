import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { KakaoService } from './kakao.service';
import {
  ApiBearerAuth,
  ApiFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TokenResponse } from './kakao.dto';

@ApiBearerAuth()
@ApiTags('카카오')
@Controller('kakao')
export class KakaoController {
  constructor(private readonly kakaoService: KakaoService) {}

  @Get('login')
  @Redirect()
  @ApiOperation({
    summary: '로그인 리다이렉트 API',
    description: '카카오 로그인 페이지로 리다이렉트 시킨다.',
  })
  @ApiFoundResponse({
    description: '[리다이렉트] 카카오 로그인 페이지',
  })
  login() {
    const url = this.kakaoService.getRedirectURL();
    return { url };
  }

  @Get('access-token')
  @ApiOperation({
    summary: '액세스 토큰 요청 API',
    description: '카카오 액세스 토큰을 요청한다.',
  })
  @ApiOkResponse({
    type: TokenResponse,
  })
  async accessToken(@Query('code') code: string): Promise<TokenResponse> {
    return await this.kakaoService.getAccessToken(code);
  }
}

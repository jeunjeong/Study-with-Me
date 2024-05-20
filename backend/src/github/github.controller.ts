import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { GithubService } from './github.service';
import {
  ApiBearerAuth,
  ApiFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AccessTokenResponse } from './github.dto';

@ApiBearerAuth()
@ApiTags('깃허브')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get('login')
  @Redirect()
  @ApiOperation({
    summary: '로그인 리다이렉트 API',
    description: '깃허브 로그인 페이지로 리다이렉트 시킨다.',
  })
  @ApiFoundResponse({
    description: '[리다이렉트] 깃허브 로그인 페이지',
  })
  login() {
    const url = this.githubService.getRedirectURL();
    return { url };
  }

  @Get('access-token')
  @ApiOperation({
    summary: '액세스 토큰 요청 API',
    description: '깃허브 액세스 토큰을 요청한다.',
  })
  @ApiOkResponse({
    type: AccessTokenResponse,
  })
  async accessToken(@Query('code') code: string): Promise<AccessTokenResponse> {
    return await this.githubService.getAccessToken(code);
  }
}

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  Redirect,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorator/user.decorator';
import { AuthService, OauthInfo } from 'src/auth/auth.service';
import { Response } from 'express';
import { OauthCallbackDocs, OauthLoginDocs } from './decorator/docs.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('OAUTH')
@Controller('oauth')
export class OauthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {}

  @Get('kakao-login')
  @Redirect()
  @OauthLoginDocs('kakao')
  async kakaoLogin(
    @Query('redirect_uri') redirect_uri?: string,
  ): Promise<{ url: string }> {
    redirect_uri ||= this.configService.get<string>('KAKAO_REDIRECT_URI');
    const client_id = this.configService.get<string>('KAKAO_CLIENT_ID');
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
    return { url };
  }

  @Get('kakao-callback')
  @UseGuards(AuthGuard('kakao'))
  @HttpCode(HttpStatus.MOVED_PERMANENTLY)
  @OauthCallbackDocs()
  async kakaoCallback(
    @User() user: OauthInfo,
    @Res() res: Response,
    @Query('redirect_uri') redirect_uri?: string,
  ): Promise<void> {
    const { accessToken, refreshToken } = await this.authService.getJWT(user);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    redirect_uri ||= this.configService.get('CLIENT_URL');
    return res.redirect(redirect_uri);
  }

  @Get('github-login')
  @Redirect()
  @OauthLoginDocs('github')
  async githubLogin(
    @Query('redirect_uri') redirect_uri?: string,
  ): Promise<{ url: string }> {
    redirect_uri ||= this.configService.get<string>('GITHUB_REDIRECT_URI');
    const client_id = this.configService.get<string>('GITHUB_CLIENT_ID');
    const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`;
    return { url };
  }

  @Get('github-callback')
  @UseGuards(AuthGuard('github'))
  @HttpCode(HttpStatus.MOVED_PERMANENTLY)
  @OauthCallbackDocs()
  async githubCallback(
    @User() user: OauthInfo,
    @Res() res: Response,
    @Query('redirect_uri') redirect_uri?: string,
  ): Promise<void> {
    const { accessToken, refreshToken } = await this.authService.getJWT(user);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    redirect_uri ||= this.configService.get('CLIENT_URL');
    return res.redirect(redirect_uri);
  }
}

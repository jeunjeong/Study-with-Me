import {
  Controller,
  Get,
  HttpStatus,
  Redirect,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/decorator/user.decorator';
import { AuthService } from 'src/auth/auth.service';
import { Response } from 'express';
import { OauthCallbackDocs, OauthLoginDocs } from './decorator/docs.decorator';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

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
  async kakaoLogin(): Promise<{ url: string }> {
    const redirect_uri = this.configService.get<string>('KAKAO_REDIRECT_URI');
    const client_id = this.configService.get<string>('KAKAO_CLIENT_ID');
    const url = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;
    return { url };
  }

  @Get('kakao-callback')
  @UseGuards(AuthGuard('kakao'))
  @OauthCallbackDocs()
  async kakaoCallback(
    @User() user: CreateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    const { accessToken, refreshToken } = await this.authService.getJWT(user);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 3600 * 1000, // 1h
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 14 * 24 * 3600 * 1000, // 14d
    });
    res.status(HttpStatus.OK).send();
  }

  @Get('github-login')
  @Redirect()
  @OauthLoginDocs('github')
  async githubLogin(): Promise<{ url: string }> {
    const redirect_uri = this.configService.get<string>('GITHUB_REDIRECT_URI');
    const client_id = this.configService.get<string>('GITHUB_CLIENT_ID');
    const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`;
    return { url };
  }

  @Get('github-callback')
  @UseGuards(AuthGuard('github'))
  @OauthCallbackDocs()
  async githubCallback(
    @User() user: CreateUserDto,
    @Res() res: Response,
  ): Promise<void> {
    const { accessToken, refreshToken } = await this.authService.getJWT(user);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      // secure: true,
      maxAge: 3600 * 1000, // 1h
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      // secure: true,
      maxAge: 14 * 24 * 3600 * 1000, // 14d
    });
    res.status(HttpStatus.OK).send();
  }
}

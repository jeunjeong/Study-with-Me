import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/decorator/user.decorator';
import { UserService } from 'src/user/user.service';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('accessToken')
  async get(@User() user: any) {
    console.log(user);
    console.log(await this.userService.user(user));
    return 'JWT 인증 아무튼 됨';
  }

  @Get('refresh')
  @ApiOperation({
    summary: '액세스 토큰 갱신',
    description: '리프레시 토큰이 유효하면 액세스 토큰을 갱신합니다.',
  })
  @ApiBearerAuth('accessToken')
  @ApiOkResponse({
    headers: {
      accessToken: { description: '새 액세스 토큰' },
    },
  })
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: Request, @Res() res: Response) {
    try {
      const newAccessToken = await this.authService.refresh(
        req.cookies.refreshToken,
      );
      res.cookie('accessToken', newAccessToken, { httpOnly: true });
      return res.send();
    } catch (err) {
      res.clearCookie('accessToken');
      res.clearCookie('refreshToken');
      throw new UnauthorizedException();
    }
  }
}

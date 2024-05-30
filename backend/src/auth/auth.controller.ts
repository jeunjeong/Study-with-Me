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
import { User as UserParam } from 'src/decorator/user.decorator';
import { UserService } from 'src/user/user.service';
import { ConnectUserDto } from 'src/user/dto/connect-user.dto';
import { AtLeastOne } from 'src/util/type';
import { User } from 'src/user/entities/user.entity';

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
  @ApiOperation({
    summary: '액세스 토큰 유효성 확인',
    description:
      '액세스 토큰이 유효한지 확인합니다. 유효하면, 유저 정보를 반환합니다.',
  })
  @ApiBearerAuth('accessToken')
  @ApiOkResponse({
    type: User,
  })
  async get(
    @UserParam()
    user: AtLeastOne<ConnectUserDto>,
  ) {
    return await this.userService.user(user);
  }

  @Get('refresh')
  @ApiOperation({
    summary: '액세스 토큰 갱신',
    description: '리프레시 토큰이 유효하면 액세스 토큰을 갱신합니다.',
  })
  @ApiBearerAuth('refreshToken')
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

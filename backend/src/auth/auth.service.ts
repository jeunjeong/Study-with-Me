import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';

enum Provider {
  kakao = 'kakao',
  github = 'github',
}

export class OauthInfo {
  name: string;
  email: string;
  provider: Provider;
}

class TokenDTO {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getJWT(oauthInfo: OauthInfo): Promise<TokenDTO> {
    // console.log('getJWT', oauthInfo);
    const user = await this.validateUser(oauthInfo);
    const accessToken = await this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    return { accessToken, refreshToken };
  }

  private async validateUser(oauthInfo: OauthInfo): Promise<User> {
    // console.log('validateUser', oauthInfo);
    const { email } = oauthInfo;
    const user =
      (await this.userService.user({ email })) ||
      (await this.userService.createUser(oauthInfo));
    return user;
  }

  private async generateAccessToken(user: User): Promise<string> {
    // console.log('generateAccessToken', user);
    const payload = { sub: user.email };
    return this.jwtService.sign(payload);
  }

  private async generateRefreshToken(user: User) {
    // console.log('generateRefreshToken', user);
    const payload = { sub: user.email };

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_EXPIRES_IN'),
    });

    await this.userService.setRefreshToken(payload.sub, refreshToken);

    return refreshToken;
  }

  async refresh(refreshToken: string): Promise<string> {
    // console.log('refresh', refreshToken);
    try {
      const decodedRefreshToken = this.jwtService.verify(refreshToken, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      const email = decodedRefreshToken.sub;
      const savedRefreshToken = await this.userService.getRefreshToken(email);

      if (!savedRefreshToken || savedRefreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh-token');
      }

      const user = await this.userService.user({ email });
      const accessToken = await this.generateAccessToken(user);

      return accessToken;
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh-token');
    }
  }

  async deleteRefreshToken(user: User) {
    // console.log('deleteRefreshToken', user);
    this.userService.deleteRefreshToken(user.email);
  }
}

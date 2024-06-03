import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      clientID: configService.get('GITHUB_CLIENT_ID'),
      clientSecret: configService.get('GITHUB_CLIENT_SECRET'),
      callbackURL: `${configService.get('GITHUB_REDIRECT_URI')}`,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile & { _json: any },
    done: (error: any, user?: any, info?: any) => void,
  ) {
    try {
      console.log(profile);
      const {
        provider,
        username: name,
        _json: { email },
      } = profile;
      const user = { provider, name, email };
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { URLSearchParams } from 'url';
import {
  AccessTokenRequest,
  AccessTokenResponse,
  AuthorizeRequest,
} from './github.dto';

@Injectable()
export class GithubService {
  private client_id: string;
  private redirect_uri: string;
  private client_secret: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.client_id = this.configService.get('GITHUB_CLIENT_ID');
    this.redirect_uri = this.configService.get('GITHUB_REDIRECT_URI');
    this.client_secret = this.configService.get('GITHUB_CLIENT_SECRET');
  }

  getRedirectURL(): string {
    const { client_id, redirect_uri } = this;
    const config: AuthorizeRequest = {
      client_id,
      redirect_uri,
    };
    const params = new URLSearchParams({ ...config }).toString();
    const url = `https://github.com/login/oauth/authorize?${params}`;
    return url;
  }

  async getAccessToken(code: string): Promise<AccessTokenResponse> {
    const { client_id, client_secret } = this;
    const url = 'https://github.com/login/oauth/access_token';
    const data: AccessTokenRequest = {
      client_id,
      client_secret,
      code,
    };
    const headers = { accept: 'application/json' };
    const res = await firstValueFrom(
      this.httpService.post(url, data, { headers }),
    );
    await this.getUserInfo(res.data.access_token);
    return res.data;
  }

  async getUserInfo(ACCESS_TOKEN: string) {
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    };
    // const config = {
    //   secure_resource: 'false',
    //   property_keys: [],
    // };
    // const params = new URLSearchParams({ ...config }).toString();
    // const url = `https://api.github.com/user?${params}`;
    const url = `https://api.github.com/user`;
    const res = await firstValueFrom(this.httpService.get(url, { headers }));

    console.log(res);
  }
}

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, firstValueFrom } from 'rxjs';
import { URLSearchParams } from 'url';
import { TokenRequest, AuthorizeRequest, TokenResponse } from './kakao.dto';
import { AxiosError } from 'axios';

@Injectable()
export class KakaoService {
  private readonly client_id: string;
  private readonly redirect_uri: string;
  private readonly client_secret: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.client_id = this.configService.get('KAKAO_CLIENT_ID');
    this.redirect_uri = this.configService.get('KAKAO_REDIRECT_URI');
    this.client_secret = this.configService.get('KAKAO_CLIENT_SECRET');
  }

  getRedirectURL(): string {
    const { client_id, redirect_uri } = this;
    const config: AuthorizeRequest = {
      client_id,
      redirect_uri,
      response_type: 'code',
    };
    const params = new URLSearchParams({ ...config }).toString();
    const url = `https://kauth.kakao.com/oauth/authorize?${params}`;
    return url;
  }

  async getAccessToken(code: string): Promise<TokenResponse> {
    const { client_id, redirect_uri, client_secret } = this;
    const url = `https://kauth.kakao.com/oauth/token`;
    const data: TokenRequest = {
      grant_type: 'authorization_code',
      client_id,
      redirect_uri,
      code,
      client_secret,
    };
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    };
    const res = await firstValueFrom(
      this.httpService.post(url, data, { headers }).pipe(
        catchError((error: AxiosError) => {
          console.log(error);
          throw '';
        }),
      ),
    );
    await this.getUserInfo(res.data.access_token);
    return res.data;
  }

  async getUserInfo(ACCESS_TOKEN: string) {
    const headers = {
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    };
    const config = {
      secure_resource: 'false',
      property_keys: [],
    };
    const params = new URLSearchParams({ ...config }).toString();
    const url = `https://kapi.kakao.com/v2/user/me?${params}`;
    const res = await firstValueFrom(this.httpService.get(url, { headers }));

    console.log(res);
  }
}

// https://developers.kakao.com/docs/latest/ko/kakaologin/rest-api

import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class AuthorizeRequest {
  @IsString()
  readonly client_id: string;

  @IsString()
  @IsUrl()
  readonly redirect_uri: string;

  @IsString()
  readonly response_type: 'code';

  @IsString()
  @IsOptional()
  readonly scope?: string;

  @IsString()
  @IsOptional()
  readonly prompt?: string;

  @IsString()
  @IsOptional()
  readonly login_hint?: string;

  @IsString()
  @IsOptional()
  readonly service_terms?: string;

  @IsString()
  @IsOptional()
  readonly state?: string;

  @IsString()
  @IsOptional()
  readonly nonce?: string;
}

export class AuthorizeResponse {
  @IsString()
  @IsOptional()
  code?: string;

  @IsString()
  @IsOptional()
  error?: string;

  @IsString()
  @IsOptional()
  error_description?: string;

  @IsString()
  @IsOptional()
  state?: string;
}

export class TokenRequest {
  @IsString()
  grant_type: 'authorization_code';

  @IsString()
  client_id: string;

  @IsString()
  @IsUrl()
  redirect_uri: string;

  @IsString()
  code: string;

  @IsString()
  client_secret: string;
}

export class TokenResponse {
  @IsString()
  @ApiProperty()
  token_type: 'bearer';

  @IsString()
  @ApiProperty()
  access_token: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  id_token?: string;

  @IsInt()
  @ApiProperty()
  expires_in: number;

  @IsString()
  @ApiProperty()
  refresh_token: string;

  @IsInt()
  @ApiProperty()
  refresh_token_expires_in: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  scope?: string;
}

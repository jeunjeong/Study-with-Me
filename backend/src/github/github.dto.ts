// https://docs.github.com/ko/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class AuthorizeRequest {
  @IsString()
  readonly client_id: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  readonly redirect_uri?: string;

  @IsString()
  @IsOptional()
  readonly login?: string;

  @IsString()
  @IsOptional()
  readonly scope?: string;

  @IsString()
  @IsOptional()
  readonly state?: string;

  @IsString()
  @IsOptional()
  readonly allow_signup?: 'true' | 'false' = 'true';
}

export class AuthorizeResponse {
  @IsString()
  code: string;

  @IsString()
  @IsOptional()
  state?: string;
}

export class AccessTokenRequest {
  @IsString()
  client_id: string;

  @IsString()
  client_secret: string;

  @IsString()
  code: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  redirect_uri?: string;
}

export class AccessTokenResponse {
  @IsString()
  @ApiProperty()
  access_token: string;

  @IsString()
  @ApiProperty()
  scope: string;

  @IsString()
  @ApiProperty()
  token_type: 'bearer';
}

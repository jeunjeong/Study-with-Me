import { applyDecorators } from '@nestjs/common';
import {
  ApiMovedPermanentlyResponse,
  ApiOperation,
  ApiQuery,
} from '@nestjs/swagger';

export const OauthLoginDocs = (platform: string = '플랫폼') => {
  return applyDecorators(
    ApiOperation({
      summary: '로그인 리다이렉트 API',
      description: `\`${platform}\` 로그인 페이지로 리다이렉트 시킨다.`,
    }),
    ApiMovedPermanentlyResponse({
      description: '리다이렉트',
      headers: {
        Location: { description: `\`${platform}\` 로그인 페이지` },
      },
    }),
  );
};

export const OauthCallbackDocs = () => {
  return applyDecorators(
    ApiOperation({
      summary: '토큰 발급 API',
      description: '액세스 토큰 및 리프레시 토큰을 발급한다.',
    }),
    ApiQuery({ name: 'code', type: 'string', required: true }),
    ApiMovedPermanentlyResponse({
      headers: {
        accessToken: { description: '액세스 토큰 `http-only`' },
        refreshToken: { description: '리프레시 토큰 `http-only`' },
      },
    }),
  );
};

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
    ApiQuery({
      name: 'redirect_uri',
      description: '인증이 완료되면, `code`와 함께 여기로 리다이렉트 됩니다.',
      type: 'string',
      required: false,
      schema: {
        example: process.env[`${platform.toUpperCase()}_REDIRECT_URI`],
      },
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
    ApiQuery({
      name: 'redirect_uri',
      description:
        '여기로 리다이렉트 됩니다. 발급된 토큰은 `http-only`로 `cookie`에 세팅됩니다. ',
      type: 'string',
      required: false,
      schema: { example: process.env.CLIENT_URL },
    }),
    ApiMovedPermanentlyResponse({
      description: '리다이렉트',
      headers: {
        Location: { description: '리다이렉트 url' },
        accessToken: { description: '액세스 토큰 `http-only`' },
        refreshToken: { description: '리프레시 토큰 `http-only`' },
      },
    }),
  );
};

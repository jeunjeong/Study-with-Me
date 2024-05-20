import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { OauthModule } from './oauth/oauth.module';

@Module({
  imports: [
    OauthModule,
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      cache: true,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

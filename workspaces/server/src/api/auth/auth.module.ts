// noinspection JSUnusedGlobalSymbols

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../../data/users/users.module';
import { AuthController } from './auth.controller';
import { LoggerModule } from '../../common/logger/logger.module';
import { ConfigModule } from '../../common/config/config.module';
import { ConfigService } from '../../common/config/config.service';
import { JwtModule } from '@nestjs/jwt';
import { BcryptModule } from '../../security/bcrypt/bcrypt.module';
import { MailModule } from '../../common/mail/mail.module';
import {TokensModule} from "../../data/tokens/tokens.module";
import {AccessTokenStrategy} from "../../security/strategies/accessToken.strategy";
import {RefreshTokenStrategy} from "../../security/strategies/refreshToken.strategy";

@Module({
  imports: [
    UsersModule,
    TokensModule,
    LoggerModule,
    ConfigModule,
    BcryptModule,
    MailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.jwtAccessSecret,
        signOptions: { expiresIn: configService.jwtAccessExpiry },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

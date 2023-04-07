import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersModule} from "../../data/users/users.module";
import {AuthController} from "./auth.controller";
import {LoggerModule} from "../../common/logger/logger.module";
import {ConfigModule} from "../../common/config/config.module";
import {ConfigService} from "../../common/config/config.service";
import {JwtModule} from "@nestjs/jwt";
import {BcryptModule} from "../../security/bcrypt/bcrypt.module";

@Module({
  imports: [UsersModule, LoggerModule, ConfigModule, BcryptModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.jwtSecret,
        signOptions: {expiresIn: configService.jwtExpiry},
      }),
      inject: [ConfigService],
    })
    ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}

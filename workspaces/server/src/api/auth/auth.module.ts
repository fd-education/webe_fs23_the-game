import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersModule} from "../../data/users/users.module";
import {AuthController} from "./auth.controller";
import {LoggerModule} from "../../logger/logger.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule} from "../../config/config.module";
import {ConfigService} from "../../config/config.service";
import {BcryptService} from "./bcrypt.service";

@Module({
  imports: [UsersModule, LoggerModule, ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.jwtSecret,
        signOptions: {expiresIn: configService.jwtExpiry},
      }),
      inject: [ConfigService],
    })
    ],
  providers: [AuthService, BcryptService],
  controllers: [AuthController]
})
export class AuthModule {}

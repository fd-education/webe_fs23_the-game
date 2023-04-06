import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UsersModule} from "../../data/users/users.module";
import {AuthController} from "./auth.controller";
import {LoggerModule} from "../../logger/logger.module";

@Module({
  imports: [UsersModule, LoggerModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}

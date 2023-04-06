import { Module } from '@nestjs/common';
import { WebsocketModule } from './websocket/websocket.module';
import { LoggerModule } from './logger/logger.module';
import {ConfigModule} from "./config/config.module";
import {DatabaseModule} from "./data/database/database.module";
import { ApiModule } from './api/api.module';
import { AuthController } from './api/auth/auth.controller';
import {AuthModule} from "./api/auth/auth.module";
import {UsersModule} from "./data/users/users.module";
import {AuthService} from "./api/auth/auth.service";

@Module({
  imports: [
      ConfigModule,
      DatabaseModule,
      LoggerModule,
      WebsocketModule,
      ApiModule,
      AuthModule,
      UsersModule
      ]
})
export class AppModule {}

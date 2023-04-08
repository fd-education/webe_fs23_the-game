import { Module } from '@nestjs/common';
import { WebsocketModule } from './websocket/websocket.module';
import { LoggerModule } from './common/logger/logger.module';
import {ConfigModule} from "./common/config/config.module";
import {DatabaseModule} from "./data/database/database.module";
import { ApiModule } from './api/api.module';
import {AuthModule} from "./api/auth/auth.module";
import {UsersModule} from "./data/users/users.module";

@Module({
  imports: [
      ConfigModule,
      DatabaseModule,
      LoggerModule,
      WebsocketModule,
      ApiModule,
      AuthModule,
      UsersModule,
      ],
})
export class AppModule {}

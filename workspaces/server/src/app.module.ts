import { Module } from '@nestjs/common';
import { WebsocketModule } from './websocket/websocket.module';
import { LoggerModule } from './logger/logger.module';
import {ConfigModule} from "./config/config.module";
import {DatabaseModule} from "./data/database/database.module";
import { UsersModule } from './data/schemas/users/users.module';

@Module({
  imports: [
      ConfigModule,
      DatabaseModule,
      LoggerModule,
      WebsocketModule,
      UsersModule,
      ],
  controllers: [],
  providers: [],
})
export class AppModule {}

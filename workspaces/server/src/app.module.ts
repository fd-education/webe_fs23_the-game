import { Module } from '@nestjs/common';
import { WebsocketModule } from './websocket/websocket.module';
import { LoggerModule } from './logger/logger.module';
import {ConfigModule} from "./config/config.module";
import {DatabaseModule} from "./database/database.module";

@Module({
  imports: [
      ConfigModule,
      DatabaseModule,
      LoggerModule,
      WebsocketModule,
      ],
  controllers: [],
  providers: [],
})
export class AppModule {}

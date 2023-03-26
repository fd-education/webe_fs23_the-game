import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketModule } from './websocket/websocket.module';
import {ConfigModule} from '@nestjs/config';
import {validationSchema} from './config/validation.schema';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [WebsocketModule, ConfigModule.forRoot({
    validationSchema
  }), LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

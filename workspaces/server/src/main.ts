import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ConfigService} from "@nestjs/config";
import {LoggerService} from "./logger/logger.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(new LoggerService())

  const configService = app.get(ConfigService);

  const port = configService.get('PORT');
  await app.listen(port);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();

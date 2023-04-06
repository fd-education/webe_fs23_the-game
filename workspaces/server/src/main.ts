import {NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import {LoggerService} from "./logger/logger.service";
import {ConfigService} from "./config/config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const configService = app.get(ConfigService, {strict: false});
  const loggerService = await app.resolve(LoggerService);

  app.useLogger(loggerService)

  await app.listen(configService.port);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();

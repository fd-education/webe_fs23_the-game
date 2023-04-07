import {NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import {LoggerService} from "./common/logger/logger.service";
import {ConfigService} from "./common/config/config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const configService = app.get(ConfigService, {strict: false});
  const loggerService = await app.resolve(LoggerService);

  app.useLogger(loggerService)

  await app.listen(configService.port);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();

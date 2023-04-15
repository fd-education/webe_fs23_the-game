import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {LoggerService} from './common/logger/logger.service';
import {ConfigService} from './common/config/config.service';
import {ValidationPipe} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService, {strict: false});
    const loggerService = await app.resolve(LoggerService);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    app.useLogger(loggerService);

    app.enableCors({
        origin: '*'
    })

    const config = new DocumentBuilder()
        .setTitle(`${configService.name} API`)
        .setVersion('0.0.1')
        .addTag(configService.name)
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(configService.port);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();

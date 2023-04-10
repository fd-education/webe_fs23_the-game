import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigModule } from '../config/config.module';
import { LoggerModule } from '../logger/logger.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '../config/config.service';
import { Stage } from '../enum/stage.enum';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.smtpHost,
          port: configService.smtpPort,
          secure: configService.smtpSecure,
          auth: {
            user: configService.smtpUsername,
            pass: configService.smtpPassword,
          },
        },
        preview: configService.stage === Stage.DEV,
        template: {
          dir: process.cwd() + '/templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MailService],
  providers: [MailService],
})
export class MailModule {}

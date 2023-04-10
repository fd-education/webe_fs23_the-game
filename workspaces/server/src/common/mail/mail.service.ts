import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '../config/config.service';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  sendPasswordResetCode(recipient: string): void {
    this.mailerService
      .sendMail({
        to: recipient,
        from: `No Reply <${this.configService.smtpSender}>`,
        sender: this.configService.smtpSender,
        text: 'Hello World!',
        html: '<b>Hello World!</b>',
      })
      .then();
  }
}

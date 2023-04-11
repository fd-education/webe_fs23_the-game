import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '../config/config.service';
import {Lang} from "../enum/lang.enum";

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  sendPasswordResetCode(recipient: string, lang: Lang): void {
    this.mailerService
      .sendMail({
          to: recipient,
          from: `No Reply <${this.configService.smtpSender}>`,
          sender: this.configService.smtpSender,
          subject: 'The Game - Reset Password',
          template: `password-token-${lang}.template.pug`,
          context: {
              user: 'Devtronaut',
              token: '2898ubib-eur9^^',
              expiry: '60',
              resetUrl: 'https://www.the-game.com/reset-password',
              frontendUrl: 'https://www.the-game.com'
          }
      })
      .then();
  }
}

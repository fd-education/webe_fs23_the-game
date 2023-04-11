import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '../config/config.service';
import {UserDto} from "../dto/user.dto";

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  sendPasswordResetCode(recipient: UserDto, token: string): void {
    this.mailerService
      .sendMail({
          to: recipient.email,
          from: `No Reply <${this.configService.smtpSender}>`,
          sender: this.configService.smtpSender,
          subject: 'The Game - Reset Password',
          template: `password-token-${recipient.language}.template.pug`,
          context: {
              user: recipient.username,
              token: token,
              expiry: '60',
              resetUrl: 'https://www.the-game.com/reset-password',
              frontendUrl: 'https://www.the-game.com'
          }
      })
      .then();
  }
}

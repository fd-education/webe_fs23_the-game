import {Body, Controller, Get, HttpCode, HttpStatus, ParseUUIDPipe, Post, Query, UseGuards} from '@nestjs/common';
import {ResetPasswordDto} from '../../common/dto/resetPassword.dto';
import { AuthService } from './auth.service';
import { SigninDto } from '../../common/dto/signin.dto';
import {
  AuthenticationFailedException,
  MalformedUserException,
} from '../../common/exceptions/auth.exceptions';
import { LoggerService } from '../../common/logger/logger.service';
import { Error } from 'mongoose';
import { RegistrationDto } from '../../common/dto/registration.dto';
import {RequestPasswordResetTokenDto} from "../../common/dto/passwordResetToken.dto";
import {AccessTokenGuard} from "../../security/guards/accessToken.guard";
import {RefreshTokenGuard} from "../../security/guards/refreshToken.guard";
import {RefreshTokenDto} from "../../common/dto/refreshToken.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private logger: LoggerService) {
    this.logger.setContext(AuthController.name);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registrationDto: RegistrationDto) {
    try {
      return await this.authService.register(registrationDto);
    } catch (exception: any) {
      if (exception instanceof Error.ValidationError) {
        this.logger.warn(`${exception}`);
        throw new MalformedUserException();
      }

      this.logger.error(`UNHANDLED: ${exception}`);
      throw exception;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signInDto: SigninDto) {
    this.logger.info(`Signing in user: ${signInDto.email}`);

    try {
      return await this.authService.signIn(
        signInDto.email,
        signInDto.password,
      );
    } catch (exception: any) {
      if (exception instanceof AuthenticationFailedException) {
        this.logger.warn(`${exception}`);
        throw exception;
      }

      this.logger.error(`UNHANDLED: ${exception}`);
      throw exception;
    }
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('validate')
  async validateAccessToken(@Body() uid: string) {
    this.logger.log(`Validating access token for user: ${uid}`)
  }

  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    this.logger.log(`Refreshing tokens for user: ${refreshTokenDto.uid}`)

    return await this.authService.refreshTokens(refreshTokenDto.uid, refreshTokenDto.refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Get('signout')
  async logout(@Query('uid', new ParseUUIDPipe({version: '4'})) uid: string) {
    this.logger.log(`Signing out user: ${uid}`)

    await this.authService.signOut(uid);
  }

  @HttpCode(HttpStatus.OK)
  @Post('request-token')
  async sendPasswordResetToken(@Body() requestTokenDto: RequestPasswordResetTokenDto) {
    await this.authService.sendPasswordResetCode(requestTokenDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto){
    return await this.authService.resetPassword(resetPasswordDto);
  }
}

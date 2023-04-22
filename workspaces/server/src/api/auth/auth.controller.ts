import {Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards} from '@nestjs/common';
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
import {RequestTokenDto} from "../../common/dto/token.dto";
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

  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return await this.authService.refreshTokens(refreshTokenDto.uid, refreshTokenDto.refreshToken);
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Get('signout')
  async logout(@Body() uid: string) {
    await this.authService.signOut(uid);
  }

  @HttpCode(HttpStatus.OK)
  @Post('request-token')
  async sendPasswordResetToken(@Body() requestTokenDto: RequestTokenDto) {
    await this.authService.sendPasswordResetCode(requestTokenDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto){
    console.log(resetPasswordDto);
    return await this.authService.resetPassword(resetPasswordDto);
  }
}

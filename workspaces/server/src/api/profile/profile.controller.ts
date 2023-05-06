import {
  Body,
  Controller, Delete, Get,
  HttpCode,
  HttpStatus, Param, ParseUUIDPipe, Patch,
  Post, Query,
  UseGuards,
} from '@nestjs/common';
import {ProfileUpdateDto} from '../../common/dto/profileUpdate.dto';
import { LoggerService } from '../../common/logger/logger.service';
import {
  PasswordDto,
  ProfileRequestDto,
} from '../../common/dto/profile.dto';
import { ProfileService } from './profile.service';
import { NoSuchProfileException } from '../../common/exceptions/profile.exceptions';
import {AccessTokenGuard} from "../../security/guards/accessToken.guard";

@Controller('profile')
@UseGuards(AccessTokenGuard)
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private logger: LoggerService,
  ) {
    this.logger.setContext(ProfileController.name);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  async getProfile(@Query('uid', new ParseUUIDPipe({version: '4'})) uuid: string) {
    this.logger.info(`Get Profile for: ${uuid}`);

    try {
      return await this.profileService.getProfile(uuid);
    } catch (exception: any) {
      if (exception instanceof NoSuchProfileException) {
        this.logger.warn(`${exception}`);
        throw exception;
      }

      this.logger.error(`UNHANDLED: ${exception}`);
      throw exception;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Patch()
  async updateProfile(@Body() profileUpdate: ProfileUpdateDto) {
    this.logger.info(`Update Profile for: ${profileUpdate.uid}`);

    try {
      return await this.profileService.updateProfile(profileUpdate);
    } catch (exception: any) {
      if (exception instanceof NoSuchProfileException) {
        this.logger.warn(`${exception}`);
        throw exception;
      }

      this.logger.error(`UNHANDLED: ${exception}`);
      throw exception;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:uid')
  async deleteProfile(@Param('uid', new ParseUUIDPipe({version: '4'})) uid: string) {
    this.logger.log(`Delete Profile for: ${uid}`);

    try {
      return await this.profileService.deleteProfile(uid);
    } catch (exception: any) {
      if (exception instanceof NoSuchProfileException) {
        this.logger.warn(`${exception}`);
        throw exception;
      }

      this.logger.error(`UNHANDLED: ${exception}`);
      throw exception;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('update-password')
  async updatePassword(@Body() passwordUpdate: PasswordDto) {
    try {
      return await this.profileService.updatePassword(passwordUpdate);
    } catch (exception: any) {
      if (exception instanceof NoSuchProfileException) {
        this.logger.warn(`${exception}`);
        throw exception;
      }

      this.logger.error(`UNHANDLED: ${exception}`);
      throw exception;
    }
  }
}

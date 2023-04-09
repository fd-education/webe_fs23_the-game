import {Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {LoggerService} from "../../common/logger/logger.service";
import {PasswordDto, ProfileDto, ProfileRequestDto} from "../../common/dto/profile.dto";
import {ProfileService} from "./profile.service";
import {NoSuchProfileException} from "../../common/exceptions/profile.exceptions";

@Controller('profile')
export class ProfileController {
    constructor(
        private profileService: ProfileService,
        private logger: LoggerService)
    {
        this.logger.setContext(ProfileController.name);
    }

    @HttpCode(HttpStatus.OK)
    @Post('get-profile')
    async getProfile(@Body() profileRequest: ProfileRequestDto){
        try{
            return await this.profileService.getProfile(profileRequest.uid);
        } catch(exception: any){
            if(exception instanceof NoSuchProfileException){
                this.logger.warn(`${exception}`);
                throw exception;
            }

            this.logger.error(`UNHANDLED: ${exception}`);
            throw exception;
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('delete-profile')
    async deleteProfile(@Body() profileRequest: ProfileRequestDto){
        try {
            return await this.profileService.deleteProfile(profileRequest.uid);
        } catch(exception: any){
            if(exception instanceof NoSuchProfileException){
                this.logger.warn(`${exception}`);
                throw exception;
            }

            this.logger.error(`UNHANDLED: ${exception}`);
            throw exception;
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('update-profile')
    async updateProfile(@Body() profileUpdate: ProfileDto){
        // TODO use validation pipe to avoid accidental password overwrite!
        console.log(profileUpdate);

        try {
            return await this.profileService.updateProfile(profileUpdate);
        } catch(exception: any){
            if(exception instanceof NoSuchProfileException){
                this.logger.warn(`${exception}`);
                throw exception;
            }

            this.logger.error(`UNHANDLED: ${exception}`);
            throw exception;
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('update-password')
    async updatePassword(@Body() passwordUpdate: PasswordDto){
        try {
            return await this.profileService.updatePassword(passwordUpdate);
        } catch(exception: any){
            if(exception instanceof NoSuchProfileException){
                this.logger.warn(`${exception}`);
                throw exception;
            }

            this.logger.error(`UNHANDLED: ${exception}`);
            throw exception;
        }
    }
}

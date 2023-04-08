import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post
} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SigninDto} from "../../common/dto/signin.dto";
import {UserDto} from "../../common/dto/user.dto";
import {
    AuthenticationFailedException,
    DuplicateUserException,
    MalformedUserException
} from "../../common/exceptions/auth.exceptions";
import {LoggerService} from "../../common/logger/logger.service";
import {Error} from "mongoose";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private logger: LoggerService){
        this.logger.setContext(AuthController.name);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(@Body() signInDto: SigninDto){
        try{
            return await this.authService.signIn(signInDto.username, signInDto.password);
        } catch(exception: any){
            if(exception instanceof AuthenticationFailedException){
                this.logger.warn(`${exception}`);
                throw exception;
            }

            this.logger.error(`UNHANDLED: ${exception}`);
            throw exception;
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() userDto: UserDto){
        try{
            return await this.authService.register(userDto);
        } catch (exception: any) {

            if(exception.code === 11000){
                this.logger.warn(`${exception}`);
                throw new DuplicateUserException();
            }

            if(exception instanceof Error.ValidationError){
                this.logger.warn(`${exception}`);
                throw new MalformedUserException();
            }

            this.logger.error(`UNHANDLED: ${exception}`);
            throw exception;
        }
    }
}

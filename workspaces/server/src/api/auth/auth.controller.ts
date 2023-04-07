import {
    BadRequestException,
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
    UnauthorizedException,
} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SigninDto} from "./signin.dto";
import {UserDto} from "../../data/users/user.dto";
import {LoggerService} from "../../logger/logger.service";
import {AuthenticationFailedException, DuplicateUserException} from "../../exceptions/auth.exceptions";

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

            this.logger.error(exception);
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() userDto: UserDto){
        try{
            return await this.authService.register(userDto);
        } catch (exception: any) {
            this.logger.error(`${exception}`);
            throw exception;
        }
    }
}

import {BadRequestException, Body, Controller, HttpCode, HttpStatus, Post,} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SigninDto} from "./signin.dto";
import {UserDto} from "../../data/users/user.dto";
import {LoggerService} from "../../logger/logger.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private logger: LoggerService){
        this.logger.setContext(AuthController.name);
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(@Body() signInDto: SigninDto){
        return await this.authService.signIn(signInDto.username, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async register(@Body() userDto: UserDto){
        try{
            return await this.authService.register(userDto);
        } catch (error: any) {
            this.logger.error(`Error: ${error}, Type: ${error.name}`);
            throw new BadRequestException('Make sure to provide a well-formed, unique user entity');
        }
    }
}

import {Injectable} from '@nestjs/common';
import {UsersService} from "../../data/users/users.service";
import {RegistrationDto} from "../../common/dto/registration.dto";
import {AuthenticationFailedException} from "../../common/exceptions/auth.exceptions";
import {JwtService} from "@nestjs/jwt";
import {BcryptService} from "../../security/bcrypt/bcrypt.service";
import {LoggerService} from "../../common/logger/logger.service";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private bcryptService: BcryptService,
        private logger: LoggerService)
    {
        this.logger.setContext(AuthService.name);
    }

    async signIn(email: string, pass: string){
        const user = await this.usersService.findByEmail(email);

        if(user === null || !(await this.bcryptService.comparePasswords(pass, user.password))){
            throw new AuthenticationFailedException(email);
        }

        const payload = {username: user.username, sub: user.uid}

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(registrationDto: RegistrationDto){
            return await this.usersService.create(registrationDto);
    }
}

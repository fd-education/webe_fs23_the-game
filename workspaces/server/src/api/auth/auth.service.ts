import {Injectable} from '@nestjs/common';
import {UsersService} from "../../data/users/users.service";
import {UserDto} from "../../data/users/user.dto";
import {RegistrationDto} from "./registration.dto";
import {AuthenticationFailedException, DuplicateUserException} from "../../exceptions/auth.exceptions";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    async signIn(email: string, pass: string){
        const user = await this.usersService.findByEmail(email);

        if(user?.password !== pass){
            throw new AuthenticationFailedException(email);
        }

        const payload = {username: user.username, sub: user.uid}

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(registrationDto: RegistrationDto){
        const user: UserDto = {
            ...registrationDto
        }

        const exists = await this.usersService.checkUsernameAndEmail(user.username, user.email);
        if(exists){
            throw new DuplicateUserException();
        }

        return await this.usersService.create(user);
    }
}

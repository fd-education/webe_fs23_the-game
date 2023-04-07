import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../../data/users/users.service";
import {UserDto} from "../../data/users/user.dto";
import {RegistrationDto} from "./registration.dto";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async signIn(email: string, pass: string){
        const user = await this.usersService.findByEmail(email);

        if(user?.password !== pass){
            throw new UnauthorizedException();
        }

        const {password, ...result} = user;

        return result;
    }

    async register(registrationDto: RegistrationDto){
        const user: UserDto = {
            ...registrationDto
        }

        const exists = await this.usersService.checkUsernameAndEmail(user.username, user.email);
        if(exists){
            throw new Error('User with similar email and/or username already existing in database!');
        }

        return await this.usersService.create(user);
    }
}

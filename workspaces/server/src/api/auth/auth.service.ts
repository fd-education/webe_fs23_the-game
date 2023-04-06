import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../../data/users/users.service";
import {UserDto} from "../../data/users/user.dto";

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

    async register(user: UserDto){
        return await this.usersService.create(user);
    }
}

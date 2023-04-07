import {Injectable} from '@nestjs/common';
import {UsersService} from "../../data/users/users.service";
import {UserDto} from "../../data/users/user.dto";
import {RegistrationDto} from "./registration.dto";
import {AuthenticationFailedException, DuplicateUserException} from "../../exceptions/auth.exceptions";
import {JwtService} from "@nestjs/jwt";
import {BcryptService} from "./bcrypt.service";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService, private bcryptService: BcryptService) {}

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
        const exists = await this.usersService.checkUsernameAndEmail(registrationDto.username, registrationDto.email);
        if(exists){
            throw new DuplicateUserException();
        }

        const hashedPassword = await this.bcryptService.hashPassword(registrationDto.password);

        const user: UserDto = {
            ...registrationDto,
            password: hashedPassword
        }

        return await this.usersService.create(user);
    }
}

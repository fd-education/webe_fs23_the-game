import {Injectable} from '@nestjs/common';
import {ConfigService} from '../../common/config/config.service';
import {UsersService} from '../../data/users/users.service';
import {JwtService} from '@nestjs/jwt';

@Injectable()
export class JwtVerifyService{
    constructor(
        private userService: UsersService,
        private configService: ConfigService) {
    }

    async verify(token: string): Promise<boolean> {
        const jwtService = new JwtService();

        const payload = jwtService.verify(token,
            {
                secret: this.configService.jwtAccessSecret
            });

        const user = await this.userService.findByUid(payload.uid);
        return user !== null;
    }
}
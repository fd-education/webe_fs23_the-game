import {Injectable} from "@nestjs/common";
import {ConfigService} from "../../config/config.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService{
    constructor(private configService: ConfigService){}

    async hashPassword(password: string): Promise<string>{
        const saltRounds = this.configService.saltRounds;
        return await bcrypt.hash(password, saltRounds);
    }

    async comparePasswords(plain: string, hash: string): Promise<boolean>{
        return await bcrypt.compare(plain, hash)
    }
}
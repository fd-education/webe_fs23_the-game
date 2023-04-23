import {Injectable} from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt";
import {PassportStrategy} from "@nestjs/passport";
import {ConfigService} from "../../common/config/config.service";

type JwtPayload = {
    sub: string;
    username: string;
}

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'access-token') {
    constructor(private configService: ConfigService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.jwtAccessSecret,
        });
    }

    validate(payload: JwtPayload) {
        return payload;
    }
}
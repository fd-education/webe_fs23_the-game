import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Request} from 'express';
import {NotAuthenticatedException} from "../exceptions/auth.exceptions";
import {ConfigService} from "../config/config.service";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService, private configService: ConfigService){}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const req = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(req);

        if(!token){
            throw new NotAuthenticatedException();
        }

        try{
            req['user'] = await this.jwtService.verifyAsync(
                token,
                {
                    secret: this.configService.jwtSecret,
                }
            );
        } catch{
            throw new NotAuthenticatedException();
        }

        return true;
    }

    private extractTokenFromHeader(req: Request): string | undefined {
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}

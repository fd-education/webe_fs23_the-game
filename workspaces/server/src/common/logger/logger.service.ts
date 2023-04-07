import {ConsoleLogger, Injectable, Scope} from "@nestjs/common";

@Injectable({scope: Scope.TRANSIENT})
export class LoggerService extends ConsoleLogger{
    info(message: string){
        super.log(message);
    }

    warn(message: string){
        super.warn(message);
    }

    error(message: string){
        super.error(message);
    }

    debug(message: string){
        super.debug(message);
    }
}
import {HttpException, HttpStatus} from "@nestjs/common";

export class DuplicateUserException extends HttpException{
    constructor(){
        super('Duplicate user. Make sure to provide a unique email and a unique username.', HttpStatus.BAD_REQUEST);
    }
}

export class MalformedUserException extends HttpException{
    constructor(){
        super('Malformed user. Make sure to provide a correct user entity.', HttpStatus.BAD_REQUEST);
    }
}

export class AuthenticationFailedException extends HttpException{
    constructor(email: string){
        super(`Authentication for user ${email} failed`, HttpStatus.UNAUTHORIZED);
    }
}
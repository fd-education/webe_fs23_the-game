import {IsEmail, IsNotEmpty, IsString, IsStrongPassword} from "class-validator";
import {Transform, TransformFnParams} from "class-transformer";

export class RegistrationDto{
    @IsString() @IsNotEmpty()
    @Transform(({value}: TransformFnParams) => value?.trim())
    readonly firstname: string

    @IsString() @IsNotEmpty()
    @Transform(({value}: TransformFnParams) => value?.trim())
    readonly lastname: string

    @IsString() @IsNotEmpty()
    @Transform(({value}: TransformFnParams) => value?.trim())
    readonly username: string

    @IsEmail()
    readonly email: string

    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    readonly password: string
    readonly profile_picture: string
}
import {IsNotEmpty, IsString, IsUUID} from "class-validator";
import {Transform, TransformFnParams} from "class-transformer";

export class TokenDto{
    @IsUUID(4)
    readonly uid?: string

    @IsString() @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly username: string

    @IsString() @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly token: string
}

export class ValidateTokenDto{
    @IsString() @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly token: string
}

export class RequestTokenDto{
    @IsString() @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly email: string

    @IsString() @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly username: string
}
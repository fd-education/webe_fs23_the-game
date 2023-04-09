import {IsNotEmpty, IsString} from "class-validator";
import {Transform, TransformFnParams} from "class-transformer";

export class SigninDto{
    @IsString() @IsNotEmpty()
    @Transform(({value}: TransformFnParams) => value?.trim())
    username: string

    @IsString() @IsNotEmpty()
    @Transform(({value}: TransformFnParams) => value?.trim())
    password: string
}
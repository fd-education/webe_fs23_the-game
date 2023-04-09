import {UserGameStatsDto} from "./user.dto";
import {IsEmail, IsEnum, IsNotEmpty, IsString, IsUUID} from "class-validator";
import {Transform, TransformFnParams} from "class-transformer";
import {Lang} from "../enum/lang.enum";
import {Theme} from "../enum/theme.enum";

export class ProfileDto{
    @IsUUID(4)
    readonly uid: string

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

    @IsEnum(Lang)
    readonly language: string

    @IsEnum(Theme)
    readonly theme: string

    readonly profile_picture: string
    readonly friend_list?: string[]
    readonly game_stats?: UserGameStatsDto
}

export class ProfileRequestDto{
    @IsUUID(4)
    readonly uid: string
}

export class PasswordDto{
    @IsUUID(4)
    readonly uid: string

    @IsString() @IsNotEmpty()
    @Transform(({value}: TransformFnParams) => value?.trim())
    readonly password: string
}
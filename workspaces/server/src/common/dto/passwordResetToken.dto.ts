import {PasswordResetTokenPayload} from '@the-game/common/dist/types/auth/passwordResetTokenPayload';
import {IsNotEmpty, IsString, IsUUID} from "class-validator";
import {Transform, TransformFnParams} from "class-transformer";

type PasswordResetToken = {
    uid?: string
    user_id: string
    token: string
}

export class PasswordResetTokenDto implements PasswordResetToken {
    @IsUUID(4)
    readonly uid?: string

    @IsString() @IsNotEmpty()
    @IsUUID(4)
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly user_id: string

    @IsString() @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly token: string
}


export class RequestPasswordResetTokenDto implements PasswordResetTokenPayload {
    @IsString() @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly email: string

    @IsString() @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly username: string
}
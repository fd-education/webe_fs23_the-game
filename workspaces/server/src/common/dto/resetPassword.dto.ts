import {Transform, TransformFnParams} from 'class-transformer';
import {IsNotEmpty, IsString, IsStrongPassword} from 'class-validator';
import {Match} from '../decorators/match.decorator';

export class ResetPasswordDto {
    @IsString() @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly resetCode: string

    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
    readonly password: string

    @Match(ResetPasswordDto, (r: ResetPasswordDto) => r.password)
    readonly confirmPassword: string
}
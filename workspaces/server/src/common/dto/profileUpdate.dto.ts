import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    IsStrongPassword,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import {Match} from '../decorators/match.decorator';
import { Lang } from '../enum/lang.enum';
import { Theme } from '../enum/theme.enum';

export class ProfileUpdateDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly firstname?: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly lastname?: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: TransformFnParams) => value?.trim())
    readonly username?: string;

    @IsEmail()
    readonly email?: string;

    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    readonly password?: string;

    @Match(ProfileUpdateDto, (r: ProfileUpdateDto) => r.password)
    readonly confirmationPassword?: string;

    @IsEnum(Lang)
    readonly language?: string;

    @IsEnum(Theme)
    readonly theme?: string;

    readonly profile_picture?: string;
}

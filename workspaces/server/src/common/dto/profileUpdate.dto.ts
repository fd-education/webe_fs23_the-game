import {Lang} from '@the-game/common/dist/enum/preferences/lang.enum';
import {Theme} from '@the-game/common/dist/enum/preferences/theme.enum';
import {ProfileUpdate} from '@the-game/common/dist/types/profile/profileUpdate';
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    IsStrongPassword, IsUUID, ValidateIf,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import {Match} from '../decorators/match.decorator';

export class ProfileUpdateDto implements ProfileUpdate{
    @IsUUID(4)
    readonly uid: string;

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

    @ValidateIf((o: ProfileUpdateDto) => o.password !== undefined)
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    readonly password?: string;

    @ValidateIf((o: ProfileUpdateDto) => o.password !== undefined)
    @Match(ProfileUpdateDto, (r: ProfileUpdateDto) => r.password)
    readonly confirmPassword?: string;

    @IsEnum(Lang)
    readonly lang?: string;

    @IsEnum(Theme)
    readonly theme?: string;

    readonly profile_picture?: string;
}

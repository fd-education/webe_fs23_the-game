
import {Lang} from '@the-game/common/dist/enum/lang.enum';
import {Theme} from '@the-game/common/dist/enum/theme.enum';
import { UserGameStatsDto } from './user.dto';
import {IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, IsUUID} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import {Profile} from '@the-game/common/dist/types/profile';


export class ProfileDto implements Profile {
  @IsUUID(4)
  readonly uid: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  readonly firstname: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  readonly lastname: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsEnum(Lang)
  readonly language: Lang;

  @IsEnum(Theme)
  readonly theme: Theme;

  readonly profile_picture: string;
  readonly friend_list?: string[];
  readonly game_stats?: UserGameStatsDto;
}

export class ProfileRequestDto {
  @IsUUID(4)
  readonly uid: string;
}

export class PasswordDto {
  @IsUUID(4)
  readonly uid: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  readonly password: string;
}

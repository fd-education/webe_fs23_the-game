import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';
import { Lang } from '../enum/lang.enum';
import { Theme } from '../enum/theme.enum';

export class UserGameStatsDto {
  @IsNumber()
  @IsPositive()
  readonly played: number;

  @IsNumber()
  @IsPositive()
  readonly wins: number;

  @IsNumber()
  @IsPositive()
  readonly defeats: number;

  @IsNumber()
  @IsPositive()
  readonly avg_duration: number;
  readonly partners: string[];
}

export class UserDto {
  @IsUUID(4)
  readonly uid?: string;

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

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value?.trim())
  readonly password: string;

  @IsEnum(Lang)
  readonly language: string;

  @IsEnum(Theme)
  readonly theme: string;

  readonly profile_picture: string;
  readonly friend_list?: string[];
  readonly game_stats?: UserGameStatsDto;
}

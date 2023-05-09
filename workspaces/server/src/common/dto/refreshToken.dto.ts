import {RefreshToken} from '@the-game/common/dist/types/auth/refreshToken';
import {IsString, IsUUID} from "class-validator";

export class RefreshTokenDto implements RefreshToken{
    @IsString() @IsUUID(4)
    uid: string;

    @IsString()
    refreshToken: string;
}
import {UserGameStatsDto} from "./user.dto";

export interface ProfileDto{
    readonly uid: string
    readonly firstname: string
    readonly lastname: string
    readonly username: string
    readonly email: string
    readonly profile_picture: string
    readonly friend_list?: string[]
    readonly game_stats?: UserGameStatsDto
}

export class ProfileRequestDto{
    readonly uid: string
}

export interface PasswordDto{
    id: string
    password: string
}
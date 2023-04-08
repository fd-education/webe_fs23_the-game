import {UserGameStatsDto} from "./user.dto";

export class ProfileDto{
    readonly uid: string
    readonly firstname: string
    readonly lastname: string
    readonly username: string
    readonly email: string
    readonly profile_picture: string
    readonly friend_list?: string[]
    readonly game_stats?: UserGameStatsDto
}
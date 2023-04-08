export class UserGameStatsDto{
    readonly played: number
    readonly wins: number
    readonly defeats: number
    readonly avg_duration: number
    readonly partners: string[]
}

export class UserDto{
    readonly uid?: string
    readonly firstname: string
    readonly lastname: string
    readonly username: string
    readonly email: string
    readonly password: string
    readonly profile_picture: string
    readonly friend_list?: string[]
    readonly game_stats?: UserGameStatsDto
}

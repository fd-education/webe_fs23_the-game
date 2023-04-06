import { HydratedDocument } from 'mongoose';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
class UserGameStats{
    @Prop()
    played: number

    @Prop()
    wins: number

    @Prop()
    defeats: number

    @Prop()
    avg_duration: number

    @Prop({
        type: [String],
        required: true
    })
    partners: string[]
}

@Schema()
export class User {
    @Prop({
        required: true,
        unique: true
    })
    uid: string

    @Prop({
        required: true
    })
    firstname: string

    @Prop({
        required: true
    })
    lastname: string

    @Prop({
        required: true,
        unique: true
    })
    username: string

    @Prop({
        required: true,
        unique: true
    })
    email: string

    @Prop({
        required: true
    })
    password: string

    @Prop()
    profile_picture: string

    @Prop({
        type: [String],
        required: true
    })
    friend_list: string[]

    @Prop({
        type: UserGameStats,
        required: false
    })
    game_stats: UserGameStats
}

export const UsersSchema = SchemaFactory.createForClass(User)

import { HydratedDocument } from 'mongoose';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';
import {Lang} from "../../common/enum/lang.enum";
import {Theme} from "../../common/enum/theme.enum";

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
        unique: true,
        default: function genUUID(){
            return uuidv4();
        }
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

    @Prop({
        type: String,
        required: true
    })
    theme: Theme

    @Prop({
        type: String,
        required: true,
    })
    language: Lang

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

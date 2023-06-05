import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Message} from '@the-game/common/dist/types/chat/message';
import {HydratedDocument} from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type ChatDocument = HydratedDocument<Chat>;

@Schema()
export class Chat implements Message {
    @Prop({
        unique: true,
        default: function genUUID() {
            return uuidv4();
        }
    })
    uid: string;

    @Prop({
        required: true,
    })
    authorUid: string;

    @Prop({
        required: true,
    })
    authorName: string;

    @Prop({
        required: true,
    })
    message: string;

    @Prop({
        required: true,
    })
    timestamp: number;
}

export const ChatsSchema = SchemaFactory.createForClass(Chat);
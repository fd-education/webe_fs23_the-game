import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type IngameChatDocument = HydratedDocument<IngameChat>;

@Schema()
export class IngameChat {
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
    gameUid: string;

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

export const IngameChatsSchema = SchemaFactory.createForClass(IngameChat);
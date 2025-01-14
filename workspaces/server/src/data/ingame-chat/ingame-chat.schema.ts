import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IngameMessageType} from '@the-game/common/dist/enum/game/ingameMessageType.enum';
import { v4 as uuidv4 } from 'uuid';

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

    @Prop({
        required: true,
    })
    type: IngameMessageType;
}

export const IngameChatsSchema = SchemaFactory.createForClass(IngameChat);
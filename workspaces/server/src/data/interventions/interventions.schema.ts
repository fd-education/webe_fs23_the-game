import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {IngameMessageType} from '@the-game/common/dist/enum/game/ingameMessageType.enum';
import {GameInterventionDto} from '@the-game/common/dist/types/game/GameInterventionDto';
import {HydratedDocument} from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type IngameChatDocument = HydratedDocument<Intervention>;

@Schema()
export class Intervention implements GameInterventionDto{
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
    playerUid: string;

    @Prop({
        required: true,
    })
    playerName: string;

    @Prop({
        required: true,
    })
    stackIndex: number;

    @Prop({
        required: true,
    })
    timestamp: number;

    @Prop({
        required: true,
    })
    type: IngameMessageType;
}

export const InterventionsSchema = SchemaFactory.createForClass(Intervention);
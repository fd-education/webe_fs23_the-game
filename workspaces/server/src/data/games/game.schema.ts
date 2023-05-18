import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {HydratedDocument} from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import {User} from '../users/user.schema';

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {
    @Prop({
        unique: true,
        default: function genUUID() {
            return uuidv4();
        },
    })
    uid: string;

    @Prop({
        required: true
    })
    creator: string;

    @Prop({
        required: true,
    })
    mode: GameMode;

    @Prop({
        required: true,
    })
    numberOfPlayers: number;

    @Prop({
        required: true,
    })
    players: string[];
}

export const GamesSchema = SchemaFactory.createForClass(Game);

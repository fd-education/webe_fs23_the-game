import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {HydratedDocument} from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type GameLobbyDocument = HydratedDocument<GameLobby>;

@Schema()
export class GameLobby {
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

export const GameLobbiesSchema = SchemaFactory.createForClass(GameLobby);

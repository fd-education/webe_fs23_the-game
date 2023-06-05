import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {GameProgress} from '@the-game/common/dist/enum/game/gameProgress.enum';
import {StackDirection} from '@the-game/common/dist/enum/game/StackDirection';
import {HydratedDocument} from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type GameDocument = HydratedDocument<GameSchema>;

@Schema({collection: 'games'})
export class GameSchema{
    @Prop({
        unique: true,
        default: function genUUID() {
            return uuidv4();
        },
    })
    gameId: string;

    @Prop({
        required: true
    })
    creator: string;

    @Prop({
        required: true,
    })
    numberOfPlayers: number;

    @Prop({
        required: true,
    })
    gameMode: GameMode;

    @Prop({
        required: true,
    })
    numberOfHandcards: number;

    @Prop({
        required: true,
    })
    progress: GameProgress;

    @Prop({
        required: true,
    })
    pickupStack: number[];

    @Prop({
        required: true,
    })
    stacks: StackSchema[];

    @Prop({
        required: true,
    })
    roundCounter: number;

    @Prop({
        required: true,
    })
    canRoundEnd: boolean;

    @Prop({
        required: true,
    })
    isNewRound: boolean;

    @Prop({
        required: true,
    })
    cardsLaidInRound: number;

    @Prop({
        required: false,
    })
    dangerRound: boolean;

    @Prop({
        required: true,
    })
    players: PlayerSchema[];
}

@Schema()
export class StackSchema{
    @Prop({
        required: true,
    })
    id: number;

    @Prop({
        required: true,
    })
    direction: StackDirection;

    @Prop({
        required: true,
    })
    cards: number[];
}

@Schema()
export class PlayerSchema{
    @Prop({
        required: true,
    })
    uid: string;

    @Prop({
        required: true,
    })
    username: string;

    @Prop({
        required: true,
    })
    handCards: number[];
}

export const GamesSchema = SchemaFactory.createForClass(GameSchema);

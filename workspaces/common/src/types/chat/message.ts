// noinspection JSUnusedGlobalSymbols

import {IngameMessageType} from '../../enum/game/ingameMessageType.enum';

export type Message = {
    authorUid: string;
    authorName: string;
    message: string;
    timestamp: number;
};

export type IngameMessage = Message & {
    type: IngameMessageType;
    gameUid: string
}

export type MessageWithKey = Message & {
    uid: string;
};


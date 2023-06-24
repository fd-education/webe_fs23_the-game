// noinspection JSUnusedGlobalSymbols

import {GameMode} from '../../enum/game/gameMode.enum';

export type GameCreateDto = {
    creator: string;
    mode: GameMode;
    numberOfPlayers: number;
}

export type GameCreateResponseDto = {
    uid: string;
    connectedPlayers: string[];
    started: boolean;
} & GameCreateDto;
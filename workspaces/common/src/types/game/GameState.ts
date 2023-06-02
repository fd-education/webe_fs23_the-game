import {GameMode} from '../../enum/game/gameMode.enum';
import {GameProgress} from '../../enum/game/gameProgress.enum';

export type GameState = {
    gameId: string;
    progress: GameProgress;
    gameMode: GameMode;

    creator: string;
    numberOfPlayers: number;

    pickupStack: number;

    stack1: number | null;
    stack2: number | null;
    stack3: number | null;
    stack4: number | null;

    canRoundEnd: boolean;

    playerAtTurn: string;

    players: Player[];
}

export type HandCards = {
    handCards: number[];
}

export type Player = {
    playerId: string;
    name: string;
    handCards: number[];
}
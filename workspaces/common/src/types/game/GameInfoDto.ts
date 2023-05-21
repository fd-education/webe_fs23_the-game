import {GameMode} from '../../enum/game/gameMode.enum';

export type GameInfoDto = {
    gameId: string;
    gameMode: GameMode;
    creator: string;
    numberOfPlayers: number;
}
import {GameMode} from '../../enum/game/gameMode.enum';

export type CreateLobby = {
    creator: string;
    mode: GameMode;
    numberOfPlayers: number;
}
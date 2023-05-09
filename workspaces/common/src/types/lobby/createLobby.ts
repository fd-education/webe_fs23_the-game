import {GameMode} from '../../enum/game/gameMode.enum';

export type CreateLobby = {
    mode: GameMode;
    numberOfPlayers: number;
}
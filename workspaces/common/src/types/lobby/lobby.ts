import {NewLobby} from './newLobby';

export type Lobby = NewLobby & {
    players: string[];
}
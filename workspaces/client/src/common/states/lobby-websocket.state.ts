import {atom} from 'recoil';

export type LobbyWebsocketState = {
    connected: boolean;
};

const lobbyWebsocketState = atom<LobbyWebsocketState>({
    key: 'lobbyWebsocketState',
    default: {
        connected: false
    }
});

export default lobbyWebsocketState;

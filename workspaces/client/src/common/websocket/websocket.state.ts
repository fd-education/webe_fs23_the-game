import {atom} from 'recoil';

export type WebsocketState = {
    connected: boolean;
};

const state = atom<WebsocketState>({
    key: 'websocketState',
    default: {
        connected: false
    }
});

export default state;

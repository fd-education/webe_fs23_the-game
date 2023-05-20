import {atom} from 'recoil';

export type WebsocketState = {
    connected: boolean;
};

const websocketState = atom<WebsocketState>({
    key: 'websocketState',
    default: {
        connected: false
    }
});

export default websocketState;

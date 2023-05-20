import {WebsocketNamespace} from '@the-game/common/dist/enum/websockets/websocket-namespace.enum';
import {createContext, ReactNode} from 'react';
import {useSetRecoilState} from 'recoil';
import io from 'socket.io-client';
import {config} from '../config/config';
import TokenRepository from '../localstorage/token.repository';
import WebSocketManager from './websocket.manager';
import websocketState from '../states/websocket.state';

const socketManager = new WebSocketManager(
    io(config.backendUrl + '/' + WebsocketNamespace.THE_GAME, {
        port: 9000,
        autoConnect: false,
        transports: ['websocket'],
        withCredentials: true,
        auth: {
            token: TokenRepository.getAccessToken()
        }
    })
);

export const WebsocketProviderCtx =
    createContext<WebSocketManager>(socketManager);

type WebsocketProviderProps = {
    children: ReactNode;
};

export function WebsocketProvider({
    children
}: WebsocketProviderProps): JSX.Element {
    socketManager.setWebsocketState = useSetRecoilState(websocketState);
    return (
        <WebsocketProviderCtx.Provider value={socketManager}>
            {children}
        </WebsocketProviderCtx.Provider>
    );
}

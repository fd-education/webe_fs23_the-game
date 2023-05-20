import {WebsocketNamespaces} from '@the-game/common/dist/enum/websockets/websocket-namespaces.enum';
import {createContext, ReactNode} from 'react';
import {useSetRecoilState} from 'recoil';
import io from 'socket.io-client';
import {config} from '../config/config';
import TokenRepository from '../localstorage/token.repository';
import WebSocketManager from './websocket.manager';
import lobbyWebsocketState from '../states/lobby-websocket.state';

const lobbySocketManager = new WebSocketManager(
    io(config.backendUrl + '/' + WebsocketNamespaces.LOBBY, {
        port: 9000,
        autoConnect: false,
        transports: ['websocket'],
        withCredentials: true,
        auth: {
            token: TokenRepository.getAccessToken()
        }
    })
);

export const LobbyWebsocketProviderCtx =
    createContext<WebSocketManager>(lobbySocketManager);

type WebsocketProviderProps = {
    children: ReactNode;
};

export function LobbyWebsocketProvider({
    children
}: WebsocketProviderProps): JSX.Element {
    lobbySocketManager.setWebsocketState =
        useSetRecoilState(lobbyWebsocketState);
    return (
        <LobbyWebsocketProviderCtx.Provider value={lobbySocketManager}>
            {children}
        </LobbyWebsocketProviderCtx.Provider>
    );
}

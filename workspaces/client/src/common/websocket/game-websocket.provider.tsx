import {WebsocketNamespaces} from '@the-game/common/dist/enum/websockets/websocket-namespaces.enum';
import {createContext, ReactNode} from 'react';
import {useSetRecoilState} from 'recoil';
import io from 'socket.io-client';
import {config} from '../config/config';
import TokenRepository from '../localstorage/token.repository';
import WebSocketManager from './websocket.manager';
import lobbyWebsocketState from '../states/lobby-websocket.state';

const gameSocketManager = new WebSocketManager(
    io(config.backendUrl + '/' + WebsocketNamespaces.GAME, {
        port: 9000,
        autoConnect: false,
        transports: ['websocket'],
        withCredentials: true,
        auth: {
            token: TokenRepository.getAccessToken()
        }
    })
);

export const GameWebsocketProviderCtx =
    createContext<WebSocketManager>(gameSocketManager);

type WebsocketProviderProps = {
    children: ReactNode;
};

export function GameWebsocketProvider({
    children
}: WebsocketProviderProps): JSX.Element {
    gameSocketManager.setWebsocketState =
        useSetRecoilState(lobbyWebsocketState);
    return (
        <GameWebsocketProviderCtx.Provider value={gameSocketManager}>
            {children}
        </GameWebsocketProviderCtx.Provider>
    );
}

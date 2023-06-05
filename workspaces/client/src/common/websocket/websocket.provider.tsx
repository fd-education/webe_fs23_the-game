import {WebsocketNamespace} from '@the-game/common/dist/enum/websockets/websocket-namespace.enum';
import {createContext, ReactNode, useEffect} from 'react';
import {useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import io from 'socket.io-client';
import useWebSocket from '../../hooks/useWebSocket';
import {config} from '../config/config';
import TokenRepository from '../localstorage/token.repository';
import accessTokenState from '../states/accessToken.state';
import userState from '../states/user.state';
import WebSocketManager from './websocket.manager';
import websocketState from '../states/websocket.state';

const socketManager = new WebSocketManager(
    io(config.backendUrl + '/' + WebsocketNamespace.THE_GAME, {
        port: 9000,
        autoConnect: false,
        transports: ['websocket']
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

    const {wsm, websocket} = useWebSocket();
    const [user] = useRecoilState(userState);

    useEffect(() => {
        if (!user) {
            return;
        }

        wsm.connect();

        return () => {
            wsm.disconnect();
        };
    }, [user]);

    return (
        <WebsocketProviderCtx.Provider value={socketManager}>
            {children}
        </WebsocketProviderCtx.Provider>
    );
}

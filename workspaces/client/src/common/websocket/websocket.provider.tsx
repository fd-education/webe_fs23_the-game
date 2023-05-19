import {createContext, ReactNode} from 'react';
import {useSetRecoilState} from 'recoil';
import WebSocketManager from './websocket.manager';
import websocketState from '../states/websocket.state';

const socketManager = new WebSocketManager();

export const WebSocketManagerCtx =
    createContext<WebSocketManager>(socketManager);

type WebsocketProviderProps = {
    children: ReactNode;
};

export function WebSocketProvider({
    children
}: WebsocketProviderProps): JSX.Element {
    socketManager.setWebsocketState = useSetRecoilState(websocketState);
    return (
        <WebSocketManagerCtx.Provider value={socketManager}>
            {children}
        </WebSocketManagerCtx.Provider>
    );
}

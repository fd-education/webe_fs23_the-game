import {WebsocketNamespaces} from '@the-game/common/dist/enum/websockets/websocket-namespaces.enum';
import {createContext, ReactNode} from 'react';
import {useSetRecoilState} from 'recoil';
import WebSocketManager from './websocket.manager';
import websocketState from './websocket.state';

const socketManager = new WebSocketManager(WebsocketNamespaces.LOBBY);

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

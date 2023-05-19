import {useContext} from 'react';
import {useRecoilValue} from 'recoil';
import {WebSocketManagerCtx} from '../common/websocket/websocket.provider';
import websocketState from '../common/states/websocket.state';

export default function () {
    const wsm = useContext(WebSocketManagerCtx);
    const websocket = useRecoilValue(websocketState);

    return {wsm, websocket};
}

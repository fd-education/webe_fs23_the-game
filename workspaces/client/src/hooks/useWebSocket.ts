import {useContext} from 'react';
import {useRecoilValue} from 'recoil';
import {WebsocketProviderCtx} from '../common/websocket/websocket.provider';
import websocketState from '../common/states/websocket.state';

export default function () {
    const wsm = useContext(WebsocketProviderCtx);
    const websocket = useRecoilValue(websocketState);

    return {wsm, websocket};
}

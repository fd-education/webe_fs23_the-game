import {useContext} from 'react';
import {useRecoilValue} from 'recoil';
import {LobbyWebsocketProviderCtx} from '../common/websocket/lobby-websocket.provider';
import lobbyWebsocketState from '../common/states/lobby-websocket.state';

export default function () {
    const wsm = useContext(LobbyWebsocketProviderCtx);
    const websocket = useRecoilValue(lobbyWebsocketState);

    return {wsm, websocket};
}

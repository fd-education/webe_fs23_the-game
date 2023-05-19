import {PlayerEvent} from '@the-game/common/dist/enum/websockets/events/player-event.enum';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRecoilValue} from 'recoil';
import websocketState from '../../common/states/websocket.state';
import {WsListener} from '../../common/websocket/websocket.manager';
import useWebSocket from '../../hooks/useWebSocket';
import {Panel} from '../util/panel/Panel';

type ActivePlayer = {
    uid: string;
    username: string;
};

export const GlobalPlayerOverview = () => {
    const {t} = useTranslation();
    const {wsm} = useWebSocket();
    const webSocketState = useRecoilValue(websocketState);
    const [players, setPlayers] = useState<Array<ActivePlayer>>([]);

    useEffect(() => {
        const onConnectedPlayers: WsListener<ActivePlayer[]> = (
            players: ActivePlayer[]
        ) => {
            console.log(`Got players: ${players}`);

            setPlayers(players);
        };

        const onNewConnectedPlayer: WsListener<ActivePlayer> = (
            player: ActivePlayer
        ) => {
            setPlayers((currentPlayers: Array<ActivePlayer>) => {
                return [player, ...currentPlayers];
            });
        };

        if (webSocketState.connected) {
            wsm.registerListener(
                PlayerEvent.CONNECTED_PLAYERS,
                onConnectedPlayers
            );

            wsm.registerListener(
                PlayerEvent.NEW_CONNECTED_PLAYER,
                onNewConnectedPlayer
            );

            wsm.emit<void>({
                event: PlayerEvent.GET_CONNECTED_PLAYERS
            });
        }

        return () => {
            wsm.removeListener(
                PlayerEvent.CONNECTED_PLAYERS,
                onConnectedPlayers
            );
            wsm.removeListener(
                PlayerEvent.NEW_CONNECTED_PLAYER,
                onNewConnectedPlayer
            );
        };
    }, [webSocketState]);

    return (
        <Panel>
            <h2>{t('players-overview.title')}</h2>
            <p>{players.length}</p>
        </Panel>
    );
};

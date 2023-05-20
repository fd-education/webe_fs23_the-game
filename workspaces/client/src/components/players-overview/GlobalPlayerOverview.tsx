import {PlayerEvent} from '@the-game/common/dist/enum/websockets/events/player-event.enum';
import {SystemEvent} from '@the-game/common/dist/enum/websockets/events/system-event.enum';
import {UserAnnouncement} from '@the-game/common/dist/types/playerOverview/userAnnouncement';
import {useEffect, useLayoutEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRecoilValue} from 'recoil';
import lobbyWebsocketState from '../../common/states/lobby-websocket.state';
import {WsListener} from '../../common/websocket/websocket.manager';
import useWebSocket from '../../hooks/useLobbyWebSocket';
import {Panel} from '../util/panel/Panel';

type ActivePlayer = {
    uid: string;
    username: string;
};

export const GlobalPlayerOverview = () => {
    const {t} = useTranslation();
    const {wsm} = useWebSocket();
    const webSocketState = useRecoilValue(lobbyWebsocketState);
    const [players, setPlayers] = useState<Array<ActivePlayer>>([]);

    useLayoutEffect(() => {
        const onConnectedPlayers: WsListener<ActivePlayer[]> = (
            players: ActivePlayer[]
        ) => {
            console.log('Got players');
            if (players.length > 0) setPlayers(players);
        };

        wsm.registerListener(SystemEvent.USER_UPDATE, onConnectedPlayers);

        return () => {
            wsm.removeListener(SystemEvent.USER_UPDATE, onConnectedPlayers);
        };
    }, [webSocketState]);

    return (
        <Panel>
            <div className="flex w-full justify-center font-title font-bold text-lg text-black dark:text-white pb-2">
                {t('players.title.global')}
            </div>
            <div className="h-full content-start overflow-y-auto">
                <div className="flex flex-col space-y-3">
                    {players.map((player: ActivePlayer) => {
                        return (
                            <div
                                key={player.uid}
                                className="flex flex-row items-center justify-start space-x-4 rounded-lg p-2 bg-the_game_gray_light"
                            >
                                <div className=" relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <span className="font-medium text-gray-600 dark:text-gray-300">
                                        {player.username
                                            .slice(0, 2)
                                            .toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex flex-row justify-between items-center">
                                    <p className="font-medium">
                                        {player.username}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Panel>
    );
};

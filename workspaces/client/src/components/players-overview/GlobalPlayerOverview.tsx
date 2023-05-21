import {SystemEvent} from '@the-game/common/dist/enum/websockets/events/system-event.enum';
import React, {useLayoutEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRecoilValue} from 'recoil';
import userState from '../../common/states/user.state';
import websocketState from '../../common/states/websocket.state';
import {WsListener} from '../../common/websocket/websocket.manager';
import useWebSocket from '../../hooks/useWebSocket';
import {UserTag} from '../util/misc/UserTag';
import {Panel} from '../util/panel/Panel';

type ActivePlayer = {
    uid: string;
    username: string;
};

export const GlobalPlayerOverview = () => {
    const {t} = useTranslation();
    const {wsm} = useWebSocket();
    const webSocketState = useRecoilValue(websocketState);
    const [player, setPlayer] = useState<ActivePlayer>();
    const [players, setPlayers] = useState<Array<ActivePlayer>>([]);
    const user = useRecoilValue(userState);

    useLayoutEffect(() => {
        if (!user) return;

        const onConnectedPlayers: WsListener<ActivePlayer[]> = (
            players: ActivePlayer[]
        ) => {
            const activePlayers = players.filter(
                (player) => player.uid !== user.uid
            );
            const ownPlayer = players.find((player) => player.uid === user.uid);

            setPlayer(ownPlayer);
            if (activePlayers.length > 0) setPlayers(activePlayers);
        };

        if (webSocketState.connected) {
            setTimeout(() => {
                wsm.emit<void>({
                    event: SystemEvent.GET_USERS
                });
            }, 1);
        }

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
                    {player && (
                        <>
                            <div
                                key={player.uid}
                                className="flex flex-row items-center justify-start space-x-4 rounded-lg p-2 my-2 bg-green-200"
                            >
                                <UserTag username={player.username} />
                                <div className="flex flex-row justify-between items-center">
                                    <p className="font-medium">
                                        {player.username}
                                    </p>
                                </div>
                            </div>
                            <div className="divider font-title font-bold text-black dark:text-white dark:before:bg-the_game_gray dark:after:bg-the_game_gray">
                                {t('players.others')}
                            </div>
                        </>
                    )}
                    {players.map((player: ActivePlayer) => {
                        return (
                            <div
                                key={player.uid}
                                className="flex flex-row items-center justify-start space-x-4 rounded-lg p-2 bg-the_game_gray_light"
                            >
                                <UserTag username={player.username} />
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

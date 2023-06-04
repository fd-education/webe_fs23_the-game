import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {GameCreateResponseDto} from '@the-game/common/dist/types/game/GameCreateDto';
import {useRecoilValue} from 'recoil';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import websocketState from '../../common/states/websocket.state';
import {WsListener} from '../../common/websocket/websocket.manager';
import useWebSocket from '../../hooks/useWebSocket';
import {Panel} from '../util/panel/Panel';
import {CreateTableForm} from './utils/CreateTableForm';
import {TableTile} from './utils/TableTile';

export const TablesView = () => {
    const {t} = useTranslation();
    const {wsm} = useWebSocket();
    const [openGames, setOpenGames] = useState<GameCreateResponseDto[]>([]);
    const [runningGames, setRunningGames] = useState<GameCreateResponseDto[]>(
        []
    );
    const webSocketState = useRecoilValue(websocketState);

    useEffect(() => {
        const onGameUpdate: WsListener<GameCreateResponseDto[]> = (
            gamesList: GameCreateResponseDto[]
        ) => {
            const open = gamesList.filter((g) => !g.started);
            const running = gamesList.filter((g) => g.started);

            setOpenGames(open);
            setRunningGames(running);
        };

        wsm.registerListener(GameEvent.GAMES_UPDATE, onGameUpdate);

        if (webSocketState.connected) {
            setTimeout(() => {
                wsm.emit<void>({
                    event: GameEvent.GET_GAMES
                });
            }, 1);
        }

        return () => {
            wsm.removeListener(GameEvent.GET_GAMES, onGameUpdate);
        };
    }, [webSocketState]);

    return (
        <Panel>
            <div className="flex flex-col h-full">
                <div className="flex w-full justify-center font-title font-bold text-lg text-black dark:text-white pb-2">
                    {t('lobby.title')}
                </div>

                <div className="h-full content-start overflow-y-auto">
                    <div className="flex flex-col space-y-3">
                        {openGames.map((game: GameCreateResponseDto) => {
                            return <TableTile game={game} key={game.uid} />;
                        })}
                        <div className="divider font-title font-bold text-black dark:text-white dark:before:bg-the_game_gray dark:after:bg-the_game_gray">
                            {t('lobby.runningGames')}
                        </div>
                        {runningGames.map((game: GameCreateResponseDto) => {
                            return <TableTile game={game} key={game.uid} />;
                        })}
                    </div>
                </div>

                <CreateTableForm />
            </div>
        </Panel>
    );
};

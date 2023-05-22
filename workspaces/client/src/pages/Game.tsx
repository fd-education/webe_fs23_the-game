import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {GameInfoDto} from '@the-game/common/dist/types/game/GameInfoDto';
import React, {FC, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {string} from 'yup';
import gameidState from '../common/states/gameid.state';
import {WsListener} from '../common/websocket/websocket.manager';
import {GameChat} from '../components/chat/GameChat';
import {GameView} from '../components/game/GameView';
import {PreferenceToggles} from '../components/util/button/PreferenceToggles';
import useWebSocket from '../hooks/useWebSocket';

export const GameContext = React.createContext(
    {} as {
        gameId: string;
        creator: string;
        gameMode: GameMode;
        numberOfPlayers: number;
    }
);

export const Game: FC = () => {
    const gameId = useRecoilValue(gameidState);
    const {wsm} = useWebSocket();
    const webSocketState = useWebSocket();

    const [numberOfPlayers, setNumberOfPlayers] = useState<number>(0);
    const [gameMode, setGameMode] = useState<GameMode>(GameMode.CLASSIC);
    const [creator, setCreator] = useState<string>('');

    useEffect(() => {
        if (!gameId) {
            // TODO Handle no game id
            return;
        }

        const onGameInfo: WsListener<GameInfoDto> = (gameInfo: GameInfoDto) => {
            setCreator(gameInfo.creator);
            setGameMode(gameInfo.gameMode);
            setNumberOfPlayers(gameInfo.numberOfPlayers);
        };

        wsm.registerListener(GameEvent.GAME_INFO, onGameInfo);

        wsm.emit<{gameId: string}>({
            event: GameEvent.GAME_INFO,
            data: {gameId: gameId}
        });

        return () => {
            wsm.removeListener(GameEvent.GAME_INFO, onGameInfo);
        };
    }, [webSocketState]);

    return (
        <GameContext.Provider
            value={{
                gameId: gameId,
                numberOfPlayers: numberOfPlayers,
                gameMode: gameMode,
                creator: creator
            }}
        >
            <div className="flex flex-row bg-primaryLight dark:bg-primaryDark h-screen w-screen">
                <div className="flex flex-col justify-between w-[25%] items-center h-screen py-8 pl-8 space-y-8">
                    <div className="h-[90%] w-full">
                        <GameChat />
                    </div>

                    <div className="flex flex-col items-center space-y-8">
                        <PreferenceToggles
                            togglesToDisplay={{
                                screenMode: true,
                                language: true
                            }}
                        />
                    </div>
                </div>

                <GameView />
            </div>
        </GameContext.Provider>
    );
};

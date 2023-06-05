import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {GameState} from '@the-game/common/dist/types/game/GameState';
import React, {FC, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import userState from '../common/states/user.state';
import {WsListener} from '../common/websocket/websocket.manager';
import {GameChat} from '../components/chat/GameChat';
import {GameView} from '../components/game/GameView';
import {PreferenceToggles} from '../components/util/button/PreferenceToggles';
import useWebSocket from '../hooks/useWebSocket';

export const GameContext = React.createContext<GameState>(
    null as unknown as GameState
);

export const Game: FC = () => {
    const navigate = useNavigate();
    const {wsm} = useWebSocket();
    const user = useRecoilValue(userState);

    const [gameState, setGameState] = useState<GameState>(
        null as unknown as GameState
    );

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const onGameInfo: WsListener<GameState> = (gameState: GameState) => {
            setGameState(gameState);
        };

        const onGameState: WsListener<GameState> = (gameState: GameState) => {
            setGameState(gameState);
        };

        wsm.registerListener(GameEvent.GAME_INFO, onGameInfo);
        wsm.registerListener(GameEvent.GAME_STATE, onGameState);

        wsm.emit<{playerUid: string}>({
            event: GameEvent.GAME_INFO,
            data: {playerUid: user.uid}
        });

        return () => {
            wsm.removeListener(GameEvent.GAME_INFO, onGameInfo);
            wsm.removeListener(GameEvent.GAME_STATE, onGameState);
        };
    }, []);

    return (
        <GameContext.Provider value={gameState}>
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

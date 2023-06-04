import {GameProgress} from '@the-game/common/dist/enum/game/gameProgress.enum';
import {StackDirection} from '@the-game/common/dist/enum/game/StackDirection';
import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {Player} from '@the-game/common/dist/types/game/GameState';
import React, {useContext, useEffect, useState} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useNavigate} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import userState from '../../common/states/user.state';
import websocketState from '../../common/states/websocket.state';
import {WsListener} from '../../common/websocket/websocket.manager';
import useWebSocket from '../../hooks/useWebSocket';
import {GameContext} from '../../pages/Game';
import {LooseDialogue} from './layout/LooseDialogue';
import {OtherPlayersRow} from './layout/OtherPlayersRow';
import {PlayerRow} from './layout/PlayerRow';
import {StartDialogue} from './layout/StartDialogue';
import {StackGroup} from './layout/StackGroup';
import {WinDialogue} from './layout/WinDialogue';

export const GameView = () => {
    const navigate = useNavigate();
    const {wsm} = useWebSocket();
    const webSocketState = useRecoilValue(websocketState);
    const user = useRecoilValue(userState);

    const gameContext = useContext(GameContext);

    const [started, setStarted] = useState<boolean>(false);
    const [player, setPlayer] = useState<Player>();
    const [gameWon, setGameWon] = useState<boolean>(false);
    const [gameLost, setGameLost] = useState<boolean>(false);

    const [isCreator, setIsCreator] = useState<boolean>(false);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const onAllPlayers: WsListener<Player[]> = (players: Player[]) => {
            const player = players.filter((p) => p.playerId === user.uid)[0];
            setPlayer(player);
        };

        if (webSocketState.connected) {
            wsm.registerListener(GameEvent.ALL_PLAYERS, onAllPlayers);
        }

        return () => {
            wsm.removeListener(GameEvent.ALL_PLAYERS, onAllPlayers);
        };
    }, [player]);

    useEffect(() => {
        if (!gameContext) {
            return;
        }

        if (!user) {
            navigate('/login');
            return;
        }

        const player = gameContext.players.filter(
            (p) => p.playerId === user.uid
        )[0];
        setPlayer(player);

        setIsCreator(user.uid === gameContext.creator);
        setStarted(gameContext.progress !== GameProgress.OPEN);

        switch (gameContext.progress) {
            case GameProgress.WON:
                setGameWon(true);
                break;
            case GameProgress.LOST:
                setGameLost(true);
                break;
        }
    }, [gameContext]);

    return (
        <>
            {!started && isCreator && <StartDialogue />}

            {gameWon && <WinDialogue />}

            {gameLost && <LooseDialogue />}

            <DndProvider backend={HTML5Backend}>
                <div className="flex flex-col h-full w-[75%] p-8">
                    <OtherPlayersRow />

                    <div className="flex flex-col justify-between h-[55%]">
                        <div className="flex flex-row h-1/2 py-4 space-x-10">
                            <StackGroup
                                stackDirection={StackDirection.DOWN}
                                stackIndex={1}
                                currentCard={gameContext?.stack1 || -1}
                            />
                            <StackGroup
                                stackDirection={StackDirection.UP}
                                stackIndex={2}
                                currentCard={gameContext?.stack2 || -1}
                            />
                        </div>
                        <div className="flex flex-row h-1/2 py-4 space-x-10">
                            <StackGroup
                                stackDirection={StackDirection.DOWN}
                                stackIndex={3}
                                currentCard={gameContext?.stack3 || -1}
                            />
                            <StackGroup
                                stackDirection={StackDirection.UP}
                                stackIndex={4}
                                currentCard={gameContext?.stack4 || -1}
                            />
                        </div>
                    </div>

                    {player && <PlayerRow />}
                </div>
            </DndProvider>
        </>
    );
};

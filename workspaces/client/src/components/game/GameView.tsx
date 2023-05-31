import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {GameState, Player} from '@the-game/common/dist/types/game/GameState';
import React, {useContext, useEffect, useState} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useTranslation} from 'react-i18next';
import {useRecoilValue} from 'recoil';
import userState from '../../common/states/user.state';
import websocketState from '../../common/states/websocket.state';
import {WsListener} from '../../common/websocket/websocket.manager';
import useWebSocket from '../../hooks/useWebSocket';
import {GameContext} from '../../pages/Game';
import {StackDirection} from './buttons/InterventionButtons';
import {OtherPlayersRow} from './layout/OtherPlayersRow';
import {PlayerRow} from './layout/PlayerRow';
import {StartDialogue} from './layout/StartDialogue';
import {StackGroup} from './layout/StackGroup';

export const GameView = () => {
    const {t} = useTranslation();
    const {wsm} = useWebSocket();
    const webSocketState = useRecoilValue(websocketState);
    const user = useRecoilValue(userState);

    const gameContext = useContext(GameContext);

    const [started, setStarted] = useState<boolean>(false);
    const [otherPlayers, setOtherPlayers] = useState<Array<Player>>();
    const [player, setPlayer] = useState<Player>();
    const [hasPickupStack, setHasPickupStack] = useState<boolean>(true);
    const [gameMode, setGameMode] = useState<GameMode>(GameMode.CLASSIC);
    const [stacks, setStacks] = useState<number[]>([-1, -1, -1, -1]);

    useEffect(() => {
        if (!user) {
            // TODO Handle no user
            return;
        }

        const onNewPlayer: WsListener<Player> = (player: Player) => {
            if (player.playerId === user.uid) {
                setPlayer(player);
                return;
            }

            console.log(otherPlayers);
            console.log(player);

            if (otherPlayers) {
                setOtherPlayers([...otherPlayers, player]);
            } else {
                setOtherPlayers([player]);
            }
        };

        const onAllPlayers: WsListener<Player[]> = (players: Player[]) => {
            const otherPlayers = players.filter((p) => p.playerId !== user.uid);
            const player = players.filter((p) => p.playerId === user.uid)[0];

            setOtherPlayers(otherPlayers);
            setPlayer(player);
        };

        const onGameState: WsListener<GameState> = (gameState: GameState) => {
            console.log(gameState);

            const otherPlayers = gameState.players.filter(
                (p) => p.playerId !== user.uid
            );
            const player = gameState.players.filter(
                (p) => p.playerId === user.uid
            )[0];

            setOtherPlayers(otherPlayers);
            setPlayer(player);

            setStarted(true);
            setHasPickupStack(gameState.pickupStack > 0);

            setStacks([
                gameState.stack1 || -1,
                gameState.stack2 || -1,
                gameState.stack3 || -1,
                gameState.stack4 || -1
            ]);
        };

        if (webSocketState.connected) {
            wsm.registerListener(GameEvent.NEW_PLAYER, onNewPlayer);
            wsm.registerListener(GameEvent.ALL_PLAYERS, onAllPlayers);
            wsm.registerListener(GameEvent.GAME_STATE, onGameState);
        }
        // setPlayer({uid: '4', name: 'me', handCards: [2, 3, 4, 77, 78, 79]});
        // setStarted(true);
        // setOtherPlayers([
        //     {uid: '1', name: 'ogplayer98', handCards: [1, 77, 3, 4, 5, 6]},
        //     {uid: '2', name: 'otherfriend', handCards: [1, 2, 3, 33, 5, 6]},
        //     {uid: '3', name: 'afriend', handCards: [1, 11, 3, 4, 5, 6]}
        // ]);

        setGameMode(GameMode.CLASSIC);

        setHasPickupStack(true);

        return () => {
            wsm.removeListener(GameEvent.NEW_PLAYER, onNewPlayer);
            wsm.removeListener(GameEvent.NEW_PLAYER, onAllPlayers);
            wsm.removeListener(GameEvent.GAME_STATE, onGameState);
        };
    }, [player]);

    return (
        <>
            {!started && user && user.uid === gameContext.creator ? (
                <StartDialogue
                    display={true}
                    numberOfPlayers={otherPlayers ? otherPlayers.length + 1 : 1}
                />
            ) : (
                <></>
            )}
            <DndProvider backend={HTML5Backend}>
                <div className="flex flex-col h-full w-[75%] p-8">
                    {otherPlayers ? (
                        <OtherPlayersRow
                            players={otherPlayers}
                            gameMode={gameMode}
                        />
                    ) : (
                        <OtherPlayersRow players={[]} gameMode={gameMode} />
                    )}

                    <div className="flex flex-col justify-between h-[55%]">
                        <div className="flex flex-row h-1/2 py-4 space-x-10">
                            {/*TODO make currentCard value dynamic*/}
                            <StackGroup
                                stackDirection={StackDirection.DOWN}
                                stackIndex={1}
                                currentCard={stacks[0]}
                                gameMode={gameMode}
                            />
                            {/*TODO make currentCard value dynamic*/}
                            <StackGroup
                                stackDirection={StackDirection.UP}
                                stackIndex={2}
                                currentCard={stacks[1]}
                                gameMode={gameMode}
                            />
                        </div>
                        <div className="flex flex-row h-1/2 py-4 space-x-10">
                            {/*TODO make currentCard value dynamic*/}
                            <StackGroup
                                stackDirection={StackDirection.DOWN}
                                stackIndex={3}
                                currentCard={stacks[2]}
                                gameMode={gameMode}
                            />
                            {/*TODO make currentCard value dynamic*/}
                            <StackGroup
                                stackDirection={StackDirection.UP}
                                stackIndex={4}
                                currentCard={stacks[3]}
                                gameMode={gameMode}
                            />
                        </div>
                    </div>

                    {player && (
                        <PlayerRow
                            started={started}
                            hasPickupStack={hasPickupStack}
                            gameMode={gameMode}
                            isAtTurn={true}
                            player={{
                                name: player.name,
                                handCards: player.handCards
                            }}
                        />
                    )}
                </div>
            </DndProvider>
        </>
    );
};

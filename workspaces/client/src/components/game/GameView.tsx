import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import React, {useEffect, useState} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useTranslation} from 'react-i18next';
import {useRecoilValue} from 'recoil';
import userState from '../../common/states/user.state';
import websocketState from '../../common/states/websocket.state';
import {WsListener} from '../../common/websocket/websocket.manager';
import useWebSocket from '../../hooks/useWebSocket';
import {StackDirection} from './buttons/InterventionButtons';
import {OtherPlayersRow} from './layout/OtherPlayersRow';
import {PlayerRow} from './layout/PlayerRow';
import {ReadyDialogue} from './layout/ReadyDialogue';
import {StackGroup} from './layout/StackGroup';

export const GameView = () => {
    const {t} = useTranslation();
    const {wsm} = useWebSocket();
    const webSocketState = useRecoilValue(websocketState);
    const user = useRecoilValue(userState);

    const [started, setStarted] = useState<boolean>(false);
    const [otherPlayers, setOtherPlayers] =
        useState<Array<{uid: string; name: string; handCards: number[]}>>();
    const [player, setPlayer] = useState<{
        uid: string;
        name: string;
        handCards: number[];
    }>();
    const [hasPickupStack, setHasPickupStack] = useState<boolean>(true);
    const [gameMode, setGameMode] = useState<GameMode>(GameMode.CLASSIC);

    useEffect(() => {
        if (!user) {
            // TODO Handle no user
            return;
        }
        const onNewPlayer: WsListener<{
            uid: string;
            name: string;
            handCards: number[];
        }> = (player: {uid: string; name: string; handCards: number[]}) => {
            if (player.uid === user.uid) {
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

        const onAllPlayers: WsListener<
            {
                uid: string;
                name: string;
                handCards: number[];
            }[]
        > = (players: {uid: string; name: string; handCards: number[]}[]) => {
            const otherPlayers = players.filter((p) => p.uid !== user.uid);
            const player = players.filter((p) => p.uid === user.uid)[0];

            setOtherPlayers(otherPlayers);
            setPlayer(player);
        };

        if (webSocketState.connected) {
            wsm.registerListener(GameEvent.NEW_PLAYER, onNewPlayer);
            wsm.registerListener(GameEvent.ALL_PLAYERS, onAllPlayers);
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
        };
    }, []);

    return (
        <>
            <ReadyDialogue display={false} />
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
                                currentCard={100}
                            />
                            {/*TODO make currentCard value dynamic*/}
                            <StackGroup
                                stackDirection={StackDirection.UP}
                                stackIndex={2}
                                currentCard={1}
                            />
                        </div>
                        <div className="flex flex-row h-1/2 py-4 space-x-10">
                            {/*TODO make currentCard value dynamic*/}
                            <StackGroup
                                stackDirection={StackDirection.DOWN}
                                stackIndex={3}
                                currentCard={100}
                            />
                            {/*TODO make currentCard value dynamic*/}
                            <StackGroup
                                stackDirection={StackDirection.UP}
                                stackIndex={4}
                                currentCard={1}
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

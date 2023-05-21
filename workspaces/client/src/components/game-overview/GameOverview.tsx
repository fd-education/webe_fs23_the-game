import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import React, {useEffect, useState} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import {useRecoilValue} from 'recoil';
import userState from '../../common/states/user.state';
import websocketState from '../../common/states/websocket.state';
import {WsListener} from '../../common/websocket/websocket.manager';
import useWebSocket from '../../hooks/useWebSocket';
import {UserTag} from '../util/misc/UserTag';
import {
    InterventionButtons,
    StackDirection
} from './buttons/InterventionButtons';
import {CardClassicBack} from './card-utils/CardClassicBack';
import {CardOnFireBack} from './card-utils/CardOnFireBack';
import {Card} from './cards/Card';
import {BottomUpIcon} from './layout/BottomUpIcon';
import {BottomUpStack} from './layout/BottomUpStack';
import {TopDownIcon} from './layout/TopDownIcon';
import {TopDownStack} from './layout/TopDownStack';

export const GameOverview = () => {
    const {wsm} = useWebSocket();
    const webSocketState = useRecoilValue(websocketState);

    const [started, setStarted] = useState<boolean>(false);
    const [otherPlayers, setOtherPlayers] = useState<
        Array<{uid: string; name: string; handCards: number[]}>
    >([]);
    const [player, setPlayer] = useState<{
        uid: string;
        name: string;
        handCards: number[];
    }>();
    const [hasPickupStack, setHasPickupStack] = useState<boolean>(true);
    const [gameMode, setGameMode] = useState<GameMode>(GameMode.CLASSIC);
    const [players, setPlayers] = useState<Array<{uid: string; name: string}>>(
        []
    );
    const user = useRecoilValue(userState);

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

            setOtherPlayers((players) => [...players, player]);
        };

        if (webSocketState.connected) {
            wsm.registerListener(GameEvent.NEW_PLAYER, onNewPlayer);
            wsm.registerListener('room', (room) => {
                console.log(room);
            });
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
        };
    }, []);

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-col h-full w-[75%] p-8">
                <div className="flex flex-row justify-around h-[19%] px-36">
                    {otherPlayers.map((player, index) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-col w-[30%] bg-the_game_gray_light rounded-3xl"
                            >
                                <div className="h-[30%] space-x-4 flex flex-row justify-center items-center">
                                    <UserTag username={player.name} />
                                    <p className="font-medium">{player.name}</p>
                                </div>
                                <div className="flex flex-row px-4 py-4 space-x-1 justify-around">
                                    {player.handCards.map((card, index) => {
                                        return (
                                            <Card
                                                gameMode={gameMode}
                                                value={card}
                                                isFlipped={false}
                                                canDrag={false}
                                                key={index}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-col justify-between h-[55%]">
                    <div className="flex flex-row h-1/2 py-4 space-x-10">
                        <div className="flex flex-row justify-end w-1/2 space-x-4 px-4 h-full">
                            <InterventionButtons
                                stackIndex={1}
                                stackDirection={StackDirection.DOWN}
                            />
                            {/*TODO make currentCard value dynamic*/}
                            <TopDownStack index={1} currentCard={100} />
                            <TopDownIcon className="h-1/2 self-center" />
                        </div>
                        <div className="flex flex-row justify-start w-1/2 space-x-4 px-4 h-full">
                            <BottomUpIcon className="h-1/2 self-center" />
                            {/*TODO make currentCard value dynamic*/}
                            <BottomUpStack index={2} currentCard={1} />
                            <InterventionButtons
                                stackIndex={2}
                                stackDirection={StackDirection.UP}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row h-1/2 py-4 space-x-10">
                        <div className="flex flex-row justify-end w-1/2 space-x-4 px-4 h-full">
                            <InterventionButtons
                                stackIndex={3}
                                stackDirection={StackDirection.DOWN}
                            />
                            {/*TODO make currentCard value dynamic*/}
                            <TopDownStack index={3} currentCard={100} />

                            <TopDownIcon className="h-1/2 self-center" />
                        </div>
                        <div className="flex flex-row justify-start w-1/2 space-x-4 px-4 h-full">
                            <BottomUpIcon className="h-1/2 self-center" />
                            {/*TODO make currentCard value dynamic*/}
                            <BottomUpStack index={4} currentCard={1} />{' '}
                            <InterventionButtons
                                stackIndex={4}
                                stackDirection={StackDirection.UP}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-row justify-around h-[26%] px-16 py-4">
                    {started &&
                        hasPickupStack &&
                        (gameMode === GameMode.CLASSIC ? (
                            <CardClassicBack />
                        ) : (
                            <CardOnFireBack />
                        ))}

                    {player && (
                        <div className="flex flex-row w-[75%] px-4 -space-x-4">
                            {player.handCards.map((card, index) => {
                                return (
                                    <div
                                        className="h-full rotate-3"
                                        key={index}
                                    >
                                        <Card
                                            gameMode={gameMode}
                                            value={card}
                                            isFlipped={true}
                                            canDrag={true}
                                            key={index}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </DndProvider>
    );
};

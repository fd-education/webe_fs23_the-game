import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import React, {useEffect, useState} from 'react';
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
    const [otherPlayers, setOtherPlayers] = useState<
        Array<{username: string; stack: number[]}>
    >([]);
    const [player, setPlayer] = useState<{username: string; stack: number[]}>();
    const [hasPickupStack, setHasPickupStack] = useState<boolean>(true);
    const [gameMode, setGameMode] = useState<GameMode>(GameMode.CLASSIC);

    useEffect(() => {
        setOtherPlayers([
            {username: 'ogplayer98', stack: [1, 77, 3, 4, 5, 6]},
            {username: 'otherfriend', stack: [1, 2, 3, 33, 5, 6]},
            {username: 'afriend', stack: [1, 11, 3, 4, 5, 6]}
        ]);

        setPlayer({username: 'me', stack: [2, 3, 4, 77, 78, 79]});

        setGameMode(GameMode.ONFIRE);

        setHasPickupStack(true);
    }, []);

    return (
        <div className="flex flex-col h-full w-[75%] p-8">
            <div className="flex flex-row justify-around h-[19%] px-36">
                {otherPlayers.map((player, index) => {
                    return (
                        <div
                            key={index}
                            className="flex flex-col w-[30%] bg-the_game_gray_light rounded-3xl"
                        >
                            <div className="h-[30%] space-x-4 flex flex-row justify-center items-center">
                                <UserTag username={player.username} />
                                <p className="font-medium">{player.username}</p>
                            </div>
                            <div className="flex flex-row px-4 py-4 space-x-1 justify-around">
                                {player.stack.map((card, index) => {
                                    return (
                                        <Card
                                            gameMode={gameMode}
                                            value={card}
                                            isFlipped={false}
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
                        <TopDownStack />
                        <TopDownIcon className="h-1/2 self-center" />
                    </div>
                    <div className="flex flex-row justify-start w-1/2 space-x-4 px-4 h-full">
                        <BottomUpIcon className="h-1/2 self-center" />
                        <BottomUpStack />
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
                        <TopDownStack />

                        <TopDownIcon className="h-1/2 self-center" />
                    </div>
                    <div className="flex flex-row justify-start w-1/2 space-x-4 px-4 h-full">
                        <BottomUpIcon className="h-1/2 self-center" />
                        <BottomUpStack />{' '}
                        <InterventionButtons
                            stackIndex={4}
                            stackDirection={StackDirection.UP}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-around h-[26%] px-16 py-4">
                {hasPickupStack &&
                    (gameMode === GameMode.CLASSIC ? (
                        <CardClassicBack />
                    ) : (
                        <CardOnFireBack />
                    ))}

                {player && (
                    <div className="flex flex-row w-[75%] px-4 -space-x-4">
                        {player.stack.map((card, index) => {
                            return (
                                <div className="h-full rotate-3" key={index}>
                                    <Card
                                        gameMode={gameMode}
                                        value={card}
                                        isFlipped={true}
                                        key={index}
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

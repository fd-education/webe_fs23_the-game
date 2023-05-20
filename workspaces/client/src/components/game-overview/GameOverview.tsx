import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import React, {useEffect, useState} from 'react';
import {Card} from './Card';
import {CardClassicBack} from './card-utils/CardClassicBack';
import {CardOnFireBack} from './card-utils/CardOnFireBack';

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

        setPlayer({username: 'me', stack: [1, 2, 3, 4, 5, 6]});

        setGameMode(GameMode.ONFIRE);

        setHasPickupStack(true);
    }, []);

    return (
        <div className="flex flex-col h-full w-[75%] p-8">
            <div className="flex flex-row justify-around h-[19%] border-b border-black px-36">
                {otherPlayers.map((player, index) => {
                    return (
                        <div
                            key={index}
                            className="flex flex-col w-[30%] bg-the_game_gray_light rounded-3xl"
                        >
                            <div className="h-[30%] space-x-4 flex flex-row justify-center items-center">
                                <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                                    <span className="font-medium text-gray-600 dark:text-gray-300">
                                        {player.username
                                            .slice(0, 2)
                                            .toUpperCase()}
                                    </span>
                                </div>
                                <p className="font-medium">{player.username}</p>
                            </div>
                            <div className="flex flex-row px-4 py-4 justify-around">
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

            <div className="flex flex-col justify-between h-[55%] border-b border-black ">
                <div className="flex flex-row h-1/2 border-b border-black py-4">
                    <div className="flex flex-row justify-end w-1/2 space-x-4 px-4 h-full">
                        <div className="bg-red-300">Down Stack</div>
                        <div className="flex flex-col space-y-2 g-amber-200">
                            <div className="bg-red-300">1</div>
                            <div className="bg-red-300">Stop</div>
                            <div className="bg-red-300">Up</div>
                        </div>
                        <div className="bg-red-300">
                            Down <br /> Icon
                        </div>
                    </div>
                    <div className="flex flex-row justify-start w-1/2 space-x-4 px-4 h-full">
                        <div className="bg-red-300">
                            Up <br /> Icon
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div className="bg-red-300">1</div>
                            <div className="bg-red-300">Stop</div>
                            <div className="bg-red-300">Up</div>
                        </div>
                        <div className="bg-red-300">Up Stack</div>
                    </div>
                </div>
                <div className="flex flex-row h-1/2 border-b border-black py-4">
                    <div className="flex flex-row justify-end w-1/2 space-x-4 px-4 h-full">
                        <div className="bg-red-300">Down Stack</div>
                        <div className="flex flex-col space-y-2 g-amber-200">
                            <div className="bg-red-300">1</div>
                            <div className="bg-red-300">Stop</div>
                            <div className="bg-red-300">Up</div>
                        </div>
                        <div className="bg-red-300">
                            Down <br /> Icon
                        </div>
                    </div>
                    <div className="flex flex-row justify-start w-1/2 space-x-4 px-4 h-full">
                        <div className="bg-red-300">
                            Up <br /> Icon
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div className="bg-red-300">1</div>
                            <div className="bg-red-300">Stop</div>
                            <div className="bg-red-300">Up</div>
                        </div>
                        <div className="bg-red-300">Up Stack</div>
                    </div>
                </div>
            </div>

            <div className="flex flex-row justify-between h-[26%] border-b border-black px-16">
                {hasPickupStack &&
                    (gameMode === GameMode.CLASSIC ? (
                        <CardClassicBack />
                    ) : (
                        <CardOnFireBack />
                    ))}

                {player && (
                    <div className="flex flex-row justify-between w-[75%] px-4 py-4 space-x-2">
                        {player.stack.map((card, index) => {
                            return (
                                <Card
                                    gameMode={gameMode}
                                    value={card}
                                    isFlipped={true}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

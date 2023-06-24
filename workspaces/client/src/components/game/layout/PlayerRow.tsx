import {GameProgress} from '@the-game/common/dist/enum/game/gameProgress.enum';
import {useContext, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import userState from '../../../common/states/user.state';
import {GameContext} from '../../../pages/Game';
import {Card} from '../cards/Card';
import {PickUpStack} from './utils/PickUpStack';

export const PlayerRow = () => {
    const gameContext = useContext(GameContext);

    const user = useRecoilValue(userState);

    const [player, setPlayer] = useState<{name: string; handCards: number[]}>();
    const [isAtTurn, setIsAtTurn] = useState<boolean>(false);
    const [started, setStarted] = useState<boolean>(false);

    useEffect(() => {
        if (!user) return;
        if (!gameContext) return;

        const player = gameContext.players.filter(
            (p) => p.playerId === user.uid
        )[0];

        setPlayer(player);
        setStarted(gameContext.progress !== GameProgress.OPEN);

        setIsAtTurn(user.uid === gameContext.playerAtTurn);
    }, [
        gameContext,
        gameContext.players.find((p) => p.playerId === gameContext.playerAtTurn)
            ?.handCards
    ]);

    return (
        <div className="flex flex-row justify-around h-[26%] px-16 py-4">
            {started && <PickUpStack />}

            {player && (
                <div className="flex flex-row justify-around h-full w-[75%] px-4">
                    <div
                        className={`h-full w-[${
                            100 * (player.handCards.length / 8)
                        }%] flex flex-row`}
                    >
                        {player.handCards.map((card, index) => {
                            return (
                                <div
                                    className="h-full rotate-3 -mx-2"
                                    key={index}
                                >
                                    <Card
                                        canDrag={isAtTurn}
                                        value={card}
                                        isFlipped={true}
                                        key={index}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

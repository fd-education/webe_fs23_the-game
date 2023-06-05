import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {GameRoundEndDto} from '@the-game/common/dist/types/game/GameRoundEndDto';
import {useContext, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import userState from '../../../../common/states/user.state';
import useWebSocket from '../../../../hooks/useWebSocket';
import {GameContext} from '../../../../pages/Game';
import {PickUpStackClassic} from './PickUpStackClassic';
import {PickUpStackOnFire} from './PickUpStackOnFire';

export const PickUpStack = () => {
    const gameContext = useContext(GameContext);
    const user = useRecoilValue(userState);
    const {wsm} = useWebSocket();

    const [gameMode, setGameMode] = useState<GameMode>();

    const [hasPickupStack, setHasPickupStack] = useState<boolean>(false);
    const [cardsOnStack, setCardsOnStack] = useState<number>(0);
    const [canRoundEnd, setCanRoundEnd] = useState<boolean>(false);
    const [isAtTurn, setIsAtTurn] = useState<boolean>(false);

    useEffect(() => {
        if (!gameContext) return;
        if (!user) return;

        setGameMode(gameContext.gameMode);
        setHasPickupStack(gameContext.pickupStack > 0);
        setCardsOnStack(gameContext.pickupStack);
        setCanRoundEnd(gameContext.canRoundEnd);
        setIsAtTurn(user.uid === gameContext.playerAtTurn);
    }, [gameContext]);

    const handleEndRound = () => {
        if (!user) return;
        if (!gameContext.gameId) return;

        wsm.emitWithAck<GameRoundEndDto>(
            {
                event: GameEvent.END_ROUND,
                data: {
                    gameUid: gameContext.gameId,
                    userUid: user.uid
                }
            },
            (success) => {
                if (!success) {
                    console.log('Failed to end round');
                }
            }
        );
    };

    return gameMode === GameMode.CLASSIC ? (
        <PickUpStackClassic
            hasPickupStack={hasPickupStack}
            cardsOnStack={cardsOnStack}
            canRoundEnd={canRoundEnd}
            onclick={handleEndRound}
            className={`${
                !(isAtTurn && canRoundEnd)
                    ? 'pointer-events-none'
                    : 'hover:cursor-pointer'
            }`}
        />
    ) : (
        <PickUpStackOnFire
            hasPickupStack={hasPickupStack}
            cardsOnStack={cardsOnStack}
            canRoundEnd={canRoundEnd}
            onclick={handleEndRound}
            className={`${
                !(isAtTurn && canRoundEnd)
                    ? 'pointer-events-none'
                    : 'hover:cursor-pointer'
            }`}
        />
    );
};

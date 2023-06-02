import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {GameRoundEndDto} from '@the-game/common/dist/types/game/GameRoundEndDto';
import {useRecoilValue} from 'recoil';
import gameidState from '../../../common/states/gameid.state';
import userState from '../../../common/states/user.state';
import useWebSocket from '../../../hooks/useWebSocket';
import {Card} from '../cards/Card';
import {CardClassicBack} from '../cards/utils/CardClassicBack';
import {CardOnFireBack} from '../cards/utils/CardOnFireBack';
import {PickUpStack} from './utils/PickUpStack';

type PlayerRowProps = {
    started: boolean;
    hasPickupStack: boolean;
    gameMode: GameMode;
    isAtTurn: boolean;
    pickupStack: number;
    canRoundEnd: boolean;
    player: {name: string; handCards: number[]};
};

export const PlayerRow = (props: PlayerRowProps) => {
    const {wsm} = useWebSocket();
    const user = useRecoilValue(userState);
    const gameId = useRecoilValue(gameidState);

    const handleEndRound = () => {
        if (!user) return;
        if (!gameId) return;

        wsm.emitWithAck<GameRoundEndDto>(
            {
                event: GameEvent.END_ROUND,
                data: {
                    gameUid: gameId,
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

    return (
        <div className="flex flex-row justify-around h-[26%] px-16 py-4">
            {props.started && (
                <PickUpStack
                    hasPickupStack={props.hasPickupStack}
                    gameMode={props.gameMode}
                    cardsOnStack={props.pickupStack}
                    canRoundEnd={props.canRoundEnd}
                    className={`${
                        !(props.isAtTurn && props.canRoundEnd)
                            ? 'pointer-events-none'
                            : 'hover:cursor-pointer'
                    }`}
                    onClick={handleEndRound}
                />
            )}

            {props.player && (
                <div className="flex flex-row w-[75%] px-4 -space-x-4">
                    {props.player.handCards.map((card, index) => {
                        return (
                            <div className="h-full rotate-3" key={index}>
                                <Card
                                    gameMode={props.gameMode}
                                    value={card}
                                    isFlipped={true}
                                    canDrag={props.isAtTurn}
                                    key={index}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {Card} from '../cards/Card';
import {CardClassicBack} from '../cards/utils/CardClassicBack';
import {CardOnFireBack} from '../cards/utils/CardOnFireBack';

type PlayerRowProps = {
    started: boolean;
    hasPickupStack: boolean;
    gameMode: GameMode;
    isAtTurn: boolean;
    player: {name: string; handCards: number[]};
};

export const PlayerRow = (props: PlayerRowProps) => {
    return (
        <div className="flex flex-row justify-around h-[26%] px-16 py-4">
            {props.started &&
                props.hasPickupStack &&
                (props.gameMode === GameMode.CLASSIC ? (
                    <CardClassicBack />
                ) : (
                    <CardOnFireBack />
                ))}

            {props.player && (
                <div className="flex flex-row w-[75%] px-4 -space-x-4">
                    {props.player.handCards.map((card, index) => {
                        return (
                            <div className="h-full rotate-3" key={index}>
                                <Card
                                    gameMode={props.gameMode}
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
    );
};

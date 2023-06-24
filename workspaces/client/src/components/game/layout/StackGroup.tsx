import {StackDirection} from '@the-game/common/dist/enum/game/StackDirection';
import {InterventionButtons} from '../buttons/InterventionButtons';
import {Card} from '../cards/Card';
import {BottomUpDropTarget} from './utils/BottomUpDropTarget';
import {BottomUpIcon} from './utils/BottomUpIcon';
import {BottomUpStack} from './utils/BottomUpStack';
import {TopDownDropTarget} from './utils/TopDownDropTarget';
import {TopDownIcon} from './utils/TopDownIcon';
import {TopDownStack} from './utils/TopDownStack';

type StackGroupProps = {
    stackDirection: StackDirection;
    stackIndex: number;
    currentCard: number;
};

export const StackGroup = (props: StackGroupProps) => {
    return (
        <>
            {props.stackDirection === StackDirection.DOWN ? (
                <div className="flex flex-row justify-end w-1/2 space-x-4 px-4 h-full">
                    <InterventionButtons
                        stackIndex={props.stackIndex}
                        stackDirection={props.stackDirection}
                    />
                    <TopDownDropTarget
                        currentCard={props.currentCard}
                        index={props.stackIndex}
                    >
                        {props.currentCard == -1 ? (
                            <TopDownStack />
                        ) : (
                            <Card
                                canDrag={false}
                                isFlipped={true}
                                value={props.currentCard}
                            />
                        )}
                    </TopDownDropTarget>
                    <TopDownIcon className="h-1/2 self-center" />
                </div>
            ) : (
                <div className="flex flex-row justify-start w-1/2 space-x-4 px-4 h-full">
                    <BottomUpIcon className="h-1/2 self-center" />
                    <BottomUpDropTarget
                        index={props.stackIndex}
                        currentCard={props.currentCard}
                    >
                        {props.currentCard == -1 ? (
                            <BottomUpStack />
                        ) : (
                            <Card
                                canDrag={false}
                                isFlipped={true}
                                value={props.currentCard}
                            />
                        )}
                    </BottomUpDropTarget>
                    <InterventionButtons
                        stackIndex={props.stackIndex}
                        stackDirection={props.stackDirection}
                    />
                </div>
            )}
        </>
    );
};

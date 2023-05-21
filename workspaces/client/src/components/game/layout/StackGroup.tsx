import {
    InterventionButtons,
    StackDirection
} from '../buttons/InterventionButtons';
import {BottomUpIcon} from './utils/BottomUpIcon';
import {BottomUpStack} from './utils/BottomUpStack';
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
            {/*TODO make currentCard value dynamic*/}
            {props.stackDirection === StackDirection.DOWN ? (
                <div className="flex flex-row justify-end w-1/2 space-x-4 px-4 h-full">
                    <InterventionButtons
                        stackIndex={props.stackIndex}
                        stackDirection={props.stackDirection}
                    />
                    <TopDownStack
                        index={props.stackIndex}
                        currentCard={props.currentCard}
                    />
                    <TopDownIcon className="h-1/2 self-center" />
                </div>
            ) : (
                <div className="flex flex-row justify-start w-1/2 space-x-4 px-4 h-full">
                    <BottomUpIcon className="h-1/2 self-center" />
                    <BottomUpStack
                        index={props.stackIndex}
                        currentCard={props.currentCard}
                    />
                    <InterventionButtons
                        stackIndex={props.stackIndex}
                        stackDirection={props.stackDirection}
                    />
                </div>
            )}
        </>
    );
};

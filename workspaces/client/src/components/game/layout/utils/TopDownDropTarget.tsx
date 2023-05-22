import {ReactElement, useEffect} from 'react';
import {useDrop} from 'react-dnd';

type DropTargetProps = {
    children: ReactElement | ReactElement[];
    index: number;
    currentCard: number;
};

export const TopDownDropTarget = (props: DropTargetProps) => {
    const [{isOver, canDrop}, drop] = useDrop(() => ({
        accept: 'Card',
        drop: (item: {value: number}) => {
            // TODO: Implement drop logic
            console.log(`Dropped ${item.value} to stack ${props.index}`);
        },
        canDrop: (item: {value: number}) =>
            canDropCard(item.value, props.currentCard),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }));

    const canDropCard = (cardValue: number, stackValue: number) => {
        return (
            stackValue === -1 ||
            cardValue < stackValue ||
            cardValue === stackValue + 10
        );
    };

    return (
        <div
            ref={drop}
            className={`h-full rounded-md w-max ${
                isOver && canDrop
                    ? ' ring-offset-0 ring-2 ring-green-500'
                    : isOver && !canDrop
                    ? ' ring-offset-0 ring-2 ring-red-500'
                    : ''
            }`}
        >
            {props.children}
        </div>
    );
};

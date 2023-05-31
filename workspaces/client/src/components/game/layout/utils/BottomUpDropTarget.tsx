import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {GameLayCardDto} from '@the-game/common/dist/types/game/GameLayCardDto';
import {ReactElement} from 'react';
import {useDrop} from 'react-dnd';
import {useRecoilValue} from 'recoil';
import gameidState from '../../../../common/states/gameid.state';
import userState from '../../../../common/states/user.state';
import useWebSocket from '../../../../hooks/useWebSocket';

type DropTargetProps = {
    children: ReactElement | ReactElement[];
    index: number;
    currentCard: number;
};

export const BottomUpDropTarget = (props: DropTargetProps) => {
    const user = useRecoilValue(userState);
    const gameId = useRecoilValue(gameidState);
    const {wsm} = useWebSocket();

    const [{isOver, canDrop}, drop] = useDrop(() => ({
        accept: 'Card',
        drop: (item: {value: number}) => {
            handleDrop(item.value, props.index);
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
            cardValue > stackValue ||
            cardValue === stackValue - 10
        );
    };

    const handleDrop = (cardValue: number, stackIndex: number) => {
        if (!user || !gameId) return;

        wsm.emit<GameLayCardDto>({
            event: GameEvent.LAY_CARD,
            data: {
                gameUid: gameId,
                userUid: user.uid,
                card: cardValue,
                stack: stackIndex - 1
            }
        });
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

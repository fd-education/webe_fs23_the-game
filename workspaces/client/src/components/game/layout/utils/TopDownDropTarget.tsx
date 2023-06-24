import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {GamePlayCardDto} from '@the-game/common/dist/types/game/GamePlayCardDto';
import {ReactElement, useContext, useEffect, useState} from 'react';
import {useDrop} from 'react-dnd';
import {useRecoilValue} from 'recoil';
import gameidState from '../../../../common/states/gameid.state';
import userState from '../../../../common/states/user.state';
import useWebSocket from '../../../../hooks/useWebSocket';
import {GameContext} from '../../../../pages/Game';

type DropTargetProps = {
    children: ReactElement | ReactElement[];
    index: number;
    currentCard: number;
};

export const TopDownDropTarget = (props: DropTargetProps) => {
    const user = useRecoilValue(userState);
    const gameId = useRecoilValue(gameidState);
    const {wsm} = useWebSocket();
    const gameContext = useContext(GameContext);

    const [gameMode, setGameMode] = useState<GameMode>(GameMode.CLASSIC);

    useEffect(() => {
        if (!gameContext) return;

        setGameMode(gameContext.gameMode);
    }, [gameContext]);

    const [{isOver}, drop] = useDrop(() => ({
        accept: 'Card',
        drop: (item: {value: number}) => {
            handleDrop(item.value, props.index);
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }));

    const handleDrop = (cardValue: number, stackIndex: number) => {
        if (!user || !gameId) return;

        wsm.emit<GamePlayCardDto>({
            event: GameEvent.PLAY_CARD,
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
                isOver && gameMode === GameMode.CLASSIC
                    ? 'ring-offset-0 ring-2 ring-the_game_purple'
                    : isOver && gameMode === GameMode.ONFIRE
                    ? 'ring-offset-0 ring-2 ring-the_game_orange'
                    : ''
            }`}
        >
            {props.children}
        </div>
    );
};

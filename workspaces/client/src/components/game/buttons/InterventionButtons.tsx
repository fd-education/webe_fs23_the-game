import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {GameInterventionDto} from '@the-game/common/dist/types/game/GameInterventionDto';
import React, {useContext} from 'react';
import {useRecoilValue} from 'recoil';
import userState from '../../../common/states/user.state';
import useWebSocket from '../../../hooks/useWebSocket';
import {GameContext} from '../../../pages/Game';
import {StackIndex} from '../layout/utils/StackIndex';
import {SaveDownButton} from './SaveDownButton';
import {SaveUpButton} from './SaveUpButton';
import {StopButton} from './StopButton';

export enum StackDirection {
    UP,
    DOWN
}

type QuickActionButtonsProps = {
    stackIndex: number;
    stackDirection: StackDirection;
};

export const InterventionButtons = (props: QuickActionButtonsProps) => {
    const {wsm} = useWebSocket();
    const user = useRecoilValue(userState);
    const gameContext = useContext(GameContext);

    const handleBlockIntervention = () => {
        if (!user) return;
        if (!gameContext) return;

        wsm.emit<GameInterventionDto>({
            event: GameEvent.BLOCK_INTERVENTION,
            data: {
                playerUid: user.uid,
                playerName: user.username,
                gameUid: gameContext.gameId,
                stackIndex: props.stackIndex,
                timestamp: Date.now()
            }
        });
    };

    const handleSaveIntervention = () => {
        if (!user) return;
        if (!gameContext) return;

        wsm.emit<GameInterventionDto>({
            event: GameEvent.SAVE_INTERVENTION,
            data: {
                playerUid: user.uid,
                playerName: user.username,
                gameUid: gameContext.gameId,
                stackIndex: props.stackIndex,
                timestamp: Date.now()
            }
        });
    };

    return (
        <div className="flex flex-col items-center space-y-2">
            <StackIndex value={props.stackIndex} />
            <StopButton
                stackIndex={props.stackIndex}
                onClick={handleBlockIntervention}
            />
            {props.stackDirection === StackDirection.UP ? (
                <SaveDownButton
                    stackIndex={props.stackIndex}
                    onClick={handleSaveIntervention}
                />
            ) : (
                <SaveUpButton
                    stackIndex={props.stackIndex}
                    onClick={handleSaveIntervention}
                />
            )}
        </div>
    );
};

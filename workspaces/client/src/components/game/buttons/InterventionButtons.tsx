import React from 'react';
import {useRecoilValue} from 'recoil';
import userState from '../../../common/states/user.state';
import useWebSocket from '../../../hooks/useWebSocket';
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

    const handleStopIntervention = () => {
        // TODO Handle Stopbutton Click
        if (!user) return;

        console.log(
            `Stop Intervention for ${user.uid} on stack ${props.stackIndex}`
        );
    };

    const handleDownSaveIntervention = () => {
        // TODO Handle DownSaveIntervention Click
        if (!user) return;

        console.log(
            `Save Down Intervention for ${user.uid} on stack ${props.stackIndex}`
        );
    };

    const handleUpSaveIntervention = () => {
        // TODO Handle UpSaveIntervention Click
        if (!user) return;

        console.log(
            `Save Up Intervention for ${user.uid} on stack ${props.stackIndex}`
        );
    };

    return (
        <div className="flex flex-col items-center space-y-2">
            <StackIndex value={props.stackIndex} />
            <StopButton onClick={handleStopIntervention} />
            {props.stackDirection === StackDirection.UP ? (
                <SaveDownButton onClick={handleDownSaveIntervention} />
            ) : (
                <SaveUpButton onClick={handleUpSaveIntervention} />
            )}
        </div>
    );
};

import {IngameMessageType} from '@the-game/common/dist/enum/game/ingameMessageType.enum';
import {IngameMessage} from '@the-game/common/dist/types/chat/message';
import {SaveDownIcon} from '../game/buttons/utils/SaveDownIcon';
import {SaveUpIcon} from '../game/buttons/utils/SaveUpIcon';
import {StopIcon} from '../game/buttons/utils/StopIcon';

type InterventionProps = {
    msg: IngameMessage;
};

export const GameIntervention = (interventionProps: InterventionProps) => {
    return (
        <div className="flex flex-row w-[75%] self-center justify-start items-center p-1 mb-1 rounded-lg text-center bg-red-900 text-white font-bold">
            <div className="h-10 m-1">
                {interventionProps.msg.type ===
                    IngameMessageType.BLOCK_INTERVENTION && (
                    <StopIcon stackIndex={-1} />
                )}
                {interventionProps.msg.type ===
                    IngameMessageType.SAVEUP_INTERVENTION && (
                    <SaveUpIcon stackIndex={-1} />
                )}
                {interventionProps.msg.type ===
                    IngameMessageType.SAVEDOWN_INTERVENTION && (
                    <SaveDownIcon stackIndex={-1} />
                )}
            </div>
            {interventionProps.msg.message}
        </div>
    );
};

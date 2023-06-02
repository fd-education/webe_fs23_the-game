import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';

export type CardFrontProps = {
    className?: string;
    isFlipped?: boolean;
    canDrag?: boolean;
    value: number;
};

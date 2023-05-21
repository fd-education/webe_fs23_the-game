import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';

export type CardProps = {
    className?: string;
    gameMode?: GameMode;
    isFlipped?: boolean;
    canDrag: boolean;
    value: number;
};

import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';

export type PickUpStackProps = {
    hasPickupStack: boolean;
    gameMode: GameMode;

    canRoundEnd: boolean;
    cardsOnStack: number;

    className?: string;
    onClick?: () => void;
};

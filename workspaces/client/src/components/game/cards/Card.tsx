import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {CardFrontProps} from './utils/cardFrontProps.type';
import {ClassicCard} from './ClassicCard';
import {OnFireCard} from './OnFireCard';

export const Card = (props: CardFrontProps) => {
    return props.gameMode === GameMode.CLASSIC ? (
        <ClassicCard {...props} />
    ) : (
        <OnFireCard {...props} />
    );
};

import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {CardProps} from '../card-utils/cardProps.type';
import {ClassicCard} from './ClassicCard';
import {OnFireCard} from './OnFireCard';

export const Card = (props: CardProps) => {
    return props.gameMode === GameMode.CLASSIC ? (
        <ClassicCard {...props} />
    ) : (
        <OnFireCard {...props} />
    );
};

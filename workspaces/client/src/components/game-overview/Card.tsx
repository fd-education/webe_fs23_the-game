import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {CardProps} from './card-utils/cardProps.type';
import {ClassicCard} from './card-utils/ClassicCard';
import {OnFireCard} from './card-utils/OnFireCard';

export const Card = (props: CardProps) => {
    return props.gameMode === GameMode.CLASSIC ? (
        <ClassicCard value={props.value} isFlipped={props.isFlipped} />
    ) : (
        <OnFireCard value={props.value} isFlipped={props.isFlipped} />
    );
};

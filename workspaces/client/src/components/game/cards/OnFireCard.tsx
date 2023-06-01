import {specialCards} from '@the-game/common/dist/constants/special-cards';
import {CardOnFireBack} from './utils/CardOnFireBack';
import {CardOnFireFrontSpecial} from './utils/CardOnFireFrontSpecial';
import {CardOnFireFrontStandard} from './utils/CardOnFireFrontStandard';
import {CardFrontProps} from './utils/cardFrontProps.type';

export const OnFireCard = (props: CardFrontProps) => {
    return !props.isFlipped ? (
        <CardOnFireBack />
    ) : specialCards.includes(props.value) ? (
        <CardOnFireFrontSpecial {...props} />
    ) : (
        <CardOnFireFrontStandard {...props} />
    );
};

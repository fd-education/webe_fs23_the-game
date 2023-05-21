import {CardOnFireBack} from './utils/CardOnFireBack';
import {CardOnFireFrontSpecial} from './utils/CardOnFireFrontSpecial';
import {CardOnFireFrontStandard} from './utils/CardOnFireFrontStandard';
import {CardProps} from './utils/cardProps.type';

export const OnFireCard = (props: CardProps) => {
    const specialCards = [22, 33, 44, 55, 66, 77];

    return !props.isFlipped ? (
        <CardOnFireBack />
    ) : specialCards.includes(props.value) ? (
        <CardOnFireFrontSpecial {...props} />
    ) : (
        <CardOnFireFrontStandard {...props} />
    );
};

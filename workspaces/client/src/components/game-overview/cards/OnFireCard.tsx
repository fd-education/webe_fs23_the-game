import {CardOnFireBack} from '../card-utils/CardOnFireBack';
import {CardOnFireFrontSpecial} from '../card-utils/CardOnFireFrontSpecial';
import {CardOnFireFrontStandard} from '../card-utils/CardOnFireFrontStandard';
import {CardProps} from '../card-utils/cardProps.type';

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

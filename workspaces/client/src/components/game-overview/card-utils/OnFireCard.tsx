import {CardClassicFront} from './CardClassicFront';
import {CardOnFireBack} from './CardOnFireBack';
import {CardOnFireFrontSpecial} from './CardOnFireFrontSpecial';
import {CardOnFireFrontStandard} from './CardOnFireFrontStandard';
import {CardProps} from './cardProps.type';

export const OnFireCard = (props: CardProps) => {
    const specialCards = [22, 33, 44, 55, 66, 77];

    return !props.isFlipped ? (
        <CardOnFireBack />
    ) : specialCards.includes(props.value) ? (
        <CardOnFireFrontSpecial value={props.value} />
    ) : (
        <CardOnFireFrontStandard value={props.value} />
    );
};

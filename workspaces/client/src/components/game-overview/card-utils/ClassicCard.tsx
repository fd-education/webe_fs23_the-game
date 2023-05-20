import {CardClassicBack} from './CardClassicBack';
import {CardClassicFront} from './CardClassicFront';
import {CardProps} from './cardProps.type';

export const ClassicCard = (props: CardProps) => {
    return props.isFlipped ? (
        <CardClassicFront value={props.value} />
    ) : (
        <CardClassicBack />
    );
};

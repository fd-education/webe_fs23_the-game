import {CardClassicBack} from '../card-utils/CardClassicBack';
import {CardClassicFront} from '../card-utils/CardClassicFront';
import {CardProps} from '../card-utils/cardProps.type';

export const ClassicCard = (props: CardProps) => {
    return props.isFlipped ? (
        <CardClassicFront value={props.value} />
    ) : (
        <CardClassicBack />
    );
};

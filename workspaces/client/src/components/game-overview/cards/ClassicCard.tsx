import {CardClassicBack} from './utils/CardClassicBack';
import {CardClassicFront} from './utils/CardClassicFront';
import {CardProps} from './utils/cardProps.type';

export const ClassicCard = (props: CardProps) => {
    return props.isFlipped ? (
        <CardClassicFront {...props} />
    ) : (
        <CardClassicBack />
    );
};

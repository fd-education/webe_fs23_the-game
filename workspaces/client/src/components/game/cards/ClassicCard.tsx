import {CardClassicBack} from './utils/CardClassicBack';
import {CardClassicFront} from './utils/CardClassicFront';
import {CardFrontProps} from './utils/cardFrontProps.type';

export const ClassicCard = (props: CardFrontProps) => {
    return props.isFlipped ? (
        <CardClassicFront {...props} />
    ) : (
        <CardClassicBack />
    );
};

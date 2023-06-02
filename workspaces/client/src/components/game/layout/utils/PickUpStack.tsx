import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {PickUpStackClassic} from './PickUpStackClassic';
import {PickUpStackOnFire} from './PickUpStackOnFire';
import {PickUpStackProps} from './pickUpStackProps.type';

export const PickUpStack = (props: PickUpStackProps) => {
    return props.gameMode === GameMode.CLASSIC ? (
        <PickUpStackClassic
            hasPickupStack={props.hasPickupStack}
            gameMode={props.gameMode}
            cardsOnStack={props.cardsOnStack}
            canRoundEnd={props.canRoundEnd}
            className={props.className}
            onClick={props.onClick}
        />
    ) : (
        <PickUpStackOnFire
            hasPickupStack={props.hasPickupStack}
            gameMode={props.gameMode}
            cardsOnStack={props.cardsOnStack}
            canRoundEnd={props.canRoundEnd}
            className={props.className}
            onClick={props.onClick}
        />
    );
};

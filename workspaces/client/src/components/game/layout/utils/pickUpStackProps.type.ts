export type PickUpStackProps = {
    hasPickupStack: boolean;
    cardsOnStack: number;
    canRoundEnd: boolean;

    className: string;
    onclick: () => void;
};

export type GameState = {
    gameId: string;
    pickupStack: number;

    stack1: number | null;
    stack2: number | null;
    stack3: number | null;
    stack4: number | null;

    handUpdate: HandUpdate[];
}

export type HandCards = {
    handCards: number[];
}

export type HandUpdate = {
    playerId: string;
    handCards: number;
}
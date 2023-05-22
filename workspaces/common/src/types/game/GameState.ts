export type GameState = {
    gameId: string;
    pickupStack: number;

    stack1: number | null;
    stack2: number | null;
    stack3: number | null;
    stack4: number | null;

    players: Player[];
}

export type HandCards = {
    handCards: number[];
}

export type Player = {
    playerId: string;
    name: string;
    handCards: number[];
}
export enum GameEvent {
    // Game Creation
    CREATE_GAME = 'create-game',
    DELETE_GAME = 'delete-game',
    NEW_GAME = 'new-game',

    // Game Listing
    GET_GAMES = 'get-games',
    GAMES_UPDATE = 'games',

    // Game Metadata
    GAME_INFO = 'game-info',

    // Game Joining
    JOIN_REQUEST = 'join-request',
    JOIN_GAME = 'join-game',
    NEW_PLAYER = 'new-player',
    ALL_PLAYERS = 'all-players',

    // Game Flow
    START_GAME = 'start-game',

    // Game State
    GAME_STATE = 'game-state',

    // Hand Cards
    HAND_CARDS = 'hand-cards',

    LAY_CARD = 'lay-card',
}
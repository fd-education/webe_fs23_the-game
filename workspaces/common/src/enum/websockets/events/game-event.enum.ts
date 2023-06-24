// noinspection JSUnusedGlobalSymbols

export enum GameEvent {
    // Game Creation
    CREATE_GAME = 'createGame',
    DELETE_GAME = 'deleteGame',

    // Game Listing
    GAMES_UPDATE = 'gamesUpdate',

    // Game Metadata
    GAME_INFO = 'gameInfo',

    // Game Joining
    JOIN_REQUEST = 'joinRequest',
    JOIN_GAME = 'joinGame',
    ALL_PLAYERS = 'allPlayers',

    // Game Flow
    START_GAME = 'startGame',

    // Game State
    GAME_STATE = 'gameState',

    PLAY_CARD = 'playCard',

    END_ROUND = 'endRound',

    INTERVENTION_HISTORY = 'interventionHistory',
    SAVE_INTERVENTION= 'saveIntervention',
    BLOCK_INTERVENTION = 'blockIntervention',
}
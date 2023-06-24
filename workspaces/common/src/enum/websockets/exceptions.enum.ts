// noinspection JSUnusedGlobalSymbols

export enum Exceptions {
    EXCEPTION = 'exception',
    PLAYER_ALREADY_IN_GAME = 'playerAlreadyInGame',
    PLAYER_ALREADY_CREATOR = 'playerAlreadyCreator',
    PLAYER_NOT_IN_GAME = 'playerNotInGame',
    PLAYER_NOT_HAVING_CARD = 'playerNotHavingCard',
    GAME_NOT_FOUND = 'gameNotFound',
    GAME_NOT_STARTED = 'gameNotStarted',
    GAME_ENDED = 'gameEnded',
    DELETER_NOT_CREATOR = 'deleterNotCreator',
    INVALID_STACK = 'invalidStack',
    INVALID_CARD = 'invalidCard',
    INVALID_CARD_FOR_STACK = 'invalidCardForStack',
    ROUND_CANNOT_END = 'roundCannotEnd',
    CANNOT_END_FINALROUND = 'cannotEndFinalRound',
}
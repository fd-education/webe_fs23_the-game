import {IngameMessageType} from '../../enum/game/ingameMessageType.enum';

export type GameInterventionDto = {
    playerUid: string,
    playerName: string,
    gameUid: string,
    stackIndex: number,
    timestamp: number,
    type: IngameMessageType,
}
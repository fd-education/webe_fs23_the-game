import {OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import {WebsocketNamespace} from '@the-game/common/dist/enum/websockets/websocket-namespace.enum';
import {Server} from 'socket.io';
import {LoggerService} from '../common/logger/logger.service';
import {ChatsService} from '../data/chats/chats.service';
import {GamesService} from '../data/games/games.service';
import {IngameChatsService} from '../data/ingame-chat/ingame-chats.service';
import {InterventionsService} from '../data/interventions/interventions.service';
import {GameManager} from '../managers/game.manager';
import {LobbyManager} from '../managers/lobby.manager';

@WebSocketGateway({
    namespace: WebsocketNamespace.THE_GAME,
    port: 9000,
    cors: {
        origin: '*',
    },
})
export class GameGateway {

    @WebSocketServer() server: Server;

    constructor(
        private logger: LoggerService,
        private gamesService: GamesService,
        private chatsService: ChatsService,
        private lobbyManager: LobbyManager,
        private gameManager: GameManager,
        private ingameChatsService: IngameChatsService,
        private interventionsService: InterventionsService,
    ) {
        this.logger.setContext(GameGateway.name);
    }

}
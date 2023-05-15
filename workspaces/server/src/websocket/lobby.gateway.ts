import {
  MessageBody, OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {ChatEvent} from '@the-game/common/dist/enum/websockets/events/chat-event.enum';
import {LobbyEvent} from '@the-game/common/dist/enum/websockets/events/lobby-event.enum';
import {SystemEvent} from '@the-game/common/dist/enum/websockets/events/system-event.enum';
import {WebsocketNamespaces} from '@the-game/common/dist/enum/websockets/websocket-namespaces.enum';
import {CreateLobby} from '@the-game/common/dist/types/lobby/createLobby';
import { LoggerService } from '../common/logger/logger.service';
import {Server} from 'socket.io';
import {GamesService} from '../data/games/games.service';
import {JwtVerifyService} from '../security/jwt/jwt.service';

@WebSocketGateway({
  namespace: WebsocketNamespaces.LOBBY,
  cors: {
    origin: '*',
  },
})
export class LobbyGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(
      private logger: LoggerService,
      private jwtVerifyService: JwtVerifyService,
      private gamesService: GamesService,
      ) {
    this.logger.setContext(LobbyGateway.name);
  }

  async handleConnection(client: any, ...args: any[]): Promise<any> {
    this.logger.info(`Client ${client.id} connected to ${WebsocketNamespaces.LOBBY}-namespace`);

    try{
      const verifiedToken = await this.jwtVerifyService.verify(client.handshake.auth.token);
      if(!verifiedToken) {
        this.logger.warn(`Client ${client.id} has no valid token and will be disconnected`);

        client.send(`${SystemEvent.UNAUTHORIZED}`);
        return client.disconnect();
      } else {
        client.send(`${SystemEvent.AUTHORIZED}`);
        this.logger.info(`Client ${client.id} has valid token`);
      }
    } catch(err: any){
      this.logger.warn(`Client ${client.id} has no valid token: ${err}`);

      client.send(SystemEvent.UNAUTHORIZED.toString());
      return client.disconnect();
    }
  }

  @SubscribeMessage(ChatEvent.SEND_GLOBAL_MESSAGE)
  handleMessage(@MessageBody() message: string): void {
    this.logger.info(message);
    this.server.emit(ChatEvent.RECEIVE_GLOBAL_MESSAGE, message);
  }

  @SubscribeMessage(LobbyEvent.CREATE_LOBBY)
  async handleCreateLobby(@MessageBody() createLobby: CreateLobby): Promise<void> {
    this.logger.info(`Creating lobby for mode ${createLobby.mode} with ${createLobby.numberOfPlayers} players`)
    const lobby = await this.gamesService.create(createLobby);
    this.server.emit(LobbyEvent.NEW_LOBBY, lobby);
  }
}

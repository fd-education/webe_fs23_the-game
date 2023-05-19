import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {ChatEvent} from '@the-game/common/dist/enum/websockets/events/chat-event.enum';
import {LobbyEvent} from '@the-game/common/dist/enum/websockets/events/lobby-event.enum';
import {PlayerEvent} from '@the-game/common/dist/enum/websockets/events/player-event.enum';
import {SystemEvent} from '@the-game/common/dist/enum/websockets/events/system-event.enum';
import {WebsocketNamespaces} from '@the-game/common/dist/enum/websockets/websocket-namespaces.enum';
import {CreateLobby} from '@the-game/common/dist/types/lobby/createLobby';
import {JoinLobby} from '@the-game/common/dist/types/lobby/joinLobby';
import {LobbyManager} from '../common/managers/lobby.manager';
import { LoggerService } from '../common/logger/logger.service';
import {GamesService} from '../data/games/games.service';
import {Server, Socket} from 'socket.io';
import {JwtVerifyService} from '../security/jwt/jwt.service';

@WebSocketGateway({
  namespace: WebsocketNamespaces.LOBBY,
  port: 9000,
  cors: {
    origin: '*',
  },
})
export class LobbyGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  constructor(
      private logger: LoggerService,
      private jwtVerifyService: JwtVerifyService,
      private gamesService: GamesService,
      private lobbyManager: LobbyManager,
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
        const clientQuery = client.handshake.query;
        const user = {uid: clientQuery.userId, username: clientQuery.userName}

        this.lobbyManager.addClient(client.id, user);

        console.log(this.lobbyManager.getClients());
        client.send(`${SystemEvent.AUTHORIZED}`);

        this.logger.info(`Client ${client.id} has valid token and is connected`);
      }
    } catch(err: any){
      this.logger.warn(`Client ${client.id} has no valid token: ${err}`);

      client.send(SystemEvent.UNAUTHORIZED.toString());
      return client.disconnect();
    }
  }

  async handleDisconnect(client: any): Promise<any> {
    this.lobbyManager.removeClient(client.id);
    this.logger.info(`Client ${client.id} disconnected from ${WebsocketNamespaces.LOBBY}-namespace`);
  }

  @SubscribeMessage(ChatEvent.SEND_GLOBAL_MESSAGE)
  handleMessage(@MessageBody() message: string): void {
    this.logger.info(message);
    this.server.emit(ChatEvent.RECEIVE_GLOBAL_MESSAGE, message);
  }

  @SubscribeMessage(LobbyEvent.GET_LOBBYS)
  async handleGetLobbys(@MessageBody() message: string): Promise<void> {
    const lobbys = await this.gamesService.findAll();

    this.logger.info(`Sending ${lobbys.length} lobbys`);
    this.server.emit(LobbyEvent.LOBBYS, lobbys);
  }

  @SubscribeMessage(LobbyEvent.CREATE_LOBBY)
  async handleCreateLobby(@MessageBody() createLobby: CreateLobby): Promise<void> {
    this.logger.info(`Creating lobby for mode ${createLobby.mode} with ${createLobby.numberOfPlayers} players`);
    const lobby = await this.gamesService.create(createLobby);
    this.server.emit(LobbyEvent.NEW_LOBBY, lobby);
  }

  @SubscribeMessage(LobbyEvent.JOIN_LOBBY)
  async handleJoinLobby(@MessageBody() joinLobby: JoinLobby): Promise<void> {
    this.logger.info(`Trying to add player ${joinLobby.user_uid} to lobby ${joinLobby.lobby_uid}`);
    const lobby = await this.gamesService.join(joinLobby);
    this.server.emit(LobbyEvent.UPDATE_LOBBY, lobby);
  }

  @SubscribeMessage(SystemEvent.GET_CHAT_HISTORY)
  async handleChatHistory(@ConnectedSocket() client: Socket): Promise<void> {
    // this.server.emit(SystemEvent.CHAT_HISTORY, this.chatManager.getChatHistory());
  }

  @SubscribeMessage(PlayerEvent.GET_CONNECTED_PLAYERS)
  async handleLobbyHistory(@ConnectedSocket() client: Socket): Promise<void> {
    const clients = this.lobbyManager.getClients();
    this.logger.info(`Sending ${clients.length} connected players to client ${client.id}`)
    this.server.emit(PlayerEvent.CONNECTED_PLAYERS, clients);
  }
}

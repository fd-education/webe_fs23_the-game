import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {ChatEvent} from '@the-game/common/dist/enum/websockets/events/chat-event.enum';
import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {LobbyEvent} from '@the-game/common/dist/enum/websockets/events/lobby-event.enum';
import {SystemEvent} from '@the-game/common/dist/enum/websockets/events/system-event.enum';
import {WebsocketNamespace} from '@the-game/common/dist/enum/websockets/websocket-namespace.enum';
import {Message} from '@the-game/common/dist/types/chat/message';
import {GameCreateDto} from '@the-game/common/dist/types/game/GameCreateDto';
import {GameJoinDto} from '@the-game/common/dist/types/game/GameJoinDto';
import {CreateLobby} from '@the-game/common/dist/types/lobby/createLobby';
import {JoinLobby} from '@the-game/common/dist/types/lobby/joinLobby';
import {UserAnnouncement} from '@the-game/common/dist/types/playerOverview/userAnnouncement';
import {GameManager} from '../common/managers/game.manager';
import {LobbyManager} from '../common/managers/lobby.manager';
import { LoggerService } from '../common/logger/logger.service';
import {ChatsService} from '../data/chats/chats.service';
import {Server, Socket} from 'socket.io';
import {GameLobbyService} from '../data/gamelobbies/game-lobby.service';
import {JwtVerifyService} from '../security/jwt/jwt.service';

@WebSocketGateway({
  namespace: WebsocketNamespace.THE_GAME,
  port: 9000,
  cors: {
    origin: '*',
  },
})
export class TheGameGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;

  constructor(
      private logger: LoggerService,
      private jwtVerifyService: JwtVerifyService,
      private gamesLobbyService: GameLobbyService,
      private chatsService: ChatsService,
      private lobbyManager: LobbyManager,
      private gameManager: GameManager,
      ) {
    this.logger.setContext(TheGameGateway.name);
  }

  async handleConnection(client: any, ...args: any[]): Promise<any> {
    this.logger.info(`Client ${client.id} connected to ${WebsocketNamespace.THE_GAME}-namespace`);

    try{
      const verifiedToken = await this.jwtVerifyService.verify(client.handshake.auth.token);
      if(!verifiedToken) {
        this.logger.warn(`Client ${client.id} has no valid token and will be disconnected`);

        client.send(`${SystemEvent.UNAUTHORIZED}`);
        return client.disconnect();
      } else {
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
    this.logger.info(`Client ${client.id} disconnected from ${WebsocketNamespace.THE_GAME}-namespace`);

    this.server.emit(SystemEvent.USER_UPDATE, this.lobbyManager.getClients());
  }

  @SubscribeMessage(SystemEvent.ANNOUNCE_USER)
  handleUserAnnouncement(@ConnectedSocket() client: Socket, @MessageBody() message: UserAnnouncement): void {
    this.lobbyManager.addClient(client.id, message, client);
    this.logger.info(`Client ${client.id} announced itself as ${message.username}`);

    this.server.emit(SystemEvent.USER_UPDATE, this.lobbyManager.getClients());
  }

  @SubscribeMessage(ChatEvent.SEND_GLOBAL_MESSAGE)
  async handleMessage(@MessageBody() message: Message): Promise<void> {
    this.logger.info(`Received message ${message.message} from ${message.authorName}`);
    this.server.emit(ChatEvent.RECEIVE_GLOBAL_MESSAGE, message);

    await this.chatsService.create(message);
  }

  @SubscribeMessage(LobbyEvent.GET_LOBBYS)
  async handleGetLobbys(@MessageBody() message: string): Promise<void> {
    const lobbys = await this.gamesLobbyService.findAll();

    this.logger.info(`Sending ${lobbys.length} lobbys`);
    this.server.emit(LobbyEvent.LOBBYS, lobbys);
  }

  @SubscribeMessage(LobbyEvent.CREATE_LOBBY)
  async handleCreateLobby(@MessageBody() createLobby: CreateLobby): Promise<void> {
    this.logger.info(`Creating lobby for mode ${createLobby.mode} with ${createLobby.numberOfPlayers} players`);
    const lobby = await this.gamesLobbyService.create(createLobby);
    this.server.emit(LobbyEvent.NEW_LOBBY, lobby);
  }

  @SubscribeMessage(LobbyEvent.JOIN_LOBBY)
  async handleJoinLobby(@MessageBody() joinLobby: JoinLobby): Promise<void> {
    this.logger.info(`Trying to add player ${joinLobby.user_uid} to lobby ${joinLobby.lobby_uid}`);
    const lobby = await this.gamesLobbyService.join(joinLobby);
    this.server.emit(LobbyEvent.UPDATE_LOBBY, lobby);
  }

  @SubscribeMessage(SystemEvent.GET_CHAT_HISTORY)
  async handleChatHistory(@ConnectedSocket() client: Socket): Promise<void> {
    const chatHistory = await this.chatsService.findAll();
    this.logger.info(`Sending ${chatHistory.length} chat messages to client ${client.id}`)
    client.emit(SystemEvent.CHAT_HISTORY, chatHistory);
  }

  @SubscribeMessage(SystemEvent.GET_USERS)
  async handleLobbyHistory(@ConnectedSocket() client: Socket): Promise<void> {
    const clients = this.lobbyManager.getClients();
    this.logger.info(`Sending ${clients.length} connected players to client ${client.id}`)
    client.emit(SystemEvent.USER_UPDATE, clients);
  }

  @SubscribeMessage(GameEvent.CREATE_GAME)
  handleCreateGame(@MessageBody() gcd: GameCreateDto): void {
    this.gameManager.createGame(gcd.creator, gcd.mode, gcd.numberOfPlayers);
    this.logger.info(`Creating game for mode ${gcd.mode} with ${gcd.numberOfPlayers} players`);

    this.server.emit(GameEvent.GAMES_UPDATE, this.gameManager.getOpenGames());
  }

  @SubscribeMessage(GameEvent.GET_GAMES)
  handleGetGames(@ConnectedSocket() client: Socket): void {
    this.logger.info(`Sending ${this.gameManager.getOpenGames().length} open games to client ${client.id}`);
    client.emit(GameEvent.GAMES_UPDATE, this.gameManager.getOpenGames());
  }

  @SubscribeMessage(GameEvent.JOIN_GAME)
  handleJoinGame(@ConnectedSocket() client: Socket, @MessageBody() gjd: GameJoinDto): void {
    this.gameManager.addPlayerToGame(gjd);
    client.join(gjd.gameUid);
    client.join(gjd.userUid);

    this.server.to(gjd.gameUid).emit('room', 'hello from room to game');
    this.server.to(gjd.userUid).emit('room', 'hello from room to player');

    this.logger.info(`Player ${gjd.userName} joined game ${gjd.gameUid}`);

    this.server.emit(GameEvent.GAMES_UPDATE, this.gameManager.getOpenGames());
  }
}

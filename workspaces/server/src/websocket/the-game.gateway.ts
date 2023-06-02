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
import {IngameMessage, Message} from '@the-game/common/dist/types/chat/message';
import {GameCreateDto} from '@the-game/common/dist/types/game/GameCreateDto';
import {GameDeleteDto} from '@the-game/common/dist/types/game/GameDeleteDto';
import {GameInfoDto} from '@the-game/common/dist/types/game/GameInfoDto';
import {GameJoinDto} from '@the-game/common/dist/types/game/GameJoinDto';
import {GameLayCardDto} from '@the-game/common/dist/types/game/GameLayCardDto';
import {GameRoundEndDto} from '@the-game/common/dist/types/game/GameRoundEndDto';
import {CreateLobby} from '@the-game/common/dist/types/lobby/createLobby';
import {JoinLobby} from '@the-game/common/dist/types/lobby/joinLobby';
import {UserAnnouncement} from '@the-game/common/dist/types/playerOverview/userAnnouncement';
import {GameManager} from '../managers/game.manager';
import {LobbyManager} from '../managers/lobby.manager';
import { LoggerService } from '../common/logger/logger.service';
import {ChatsService} from '../data/chats/chats.service';
import {Server, Socket} from 'socket.io';
import {GameLobbyService} from '../data/gamelobbies/game-lobby.service';

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
      private gamesLobbyService: GameLobbyService,
      private chatsService: ChatsService,
      private lobbyManager: LobbyManager,
      private gameManager: GameManager,
      ) {
    this.logger.setContext(TheGameGateway.name);
  }

  async handleConnection(client: any, ...args: any[]): Promise<any> {
    this.logger.info(`Client ${client.id} connected to ${WebsocketNamespace.THE_GAME}-namespace`);
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

  @SubscribeMessage(GameEvent.DELETE_GAME)
  handleDeleteGame(@MessageBody() gdd: GameDeleteDto): boolean {
    try{
      this.gameManager.deleteGame(gdd.gameUid);
      this.logger.info(`Deleting game ${gdd.gameUid}`);

      this.server.emit(GameEvent.GAMES_UPDATE, this.gameManager.getOpenGames());

      return true;
    } catch(e){
      this.logger.warn(`Could not delete game ${gdd.gameUid}: ${e}`);
      return false;
    }
  }

  @SubscribeMessage(GameEvent.GET_GAMES)
  handleGetGames(@ConnectedSocket() client: Socket): void {
    this.logger.info(`Sending ${this.gameManager.getOpenGames().length} open games to client ${client.id}`);
    client.emit(GameEvent.GAMES_UPDATE, this.gameManager.getOpenGames());
  }

  @SubscribeMessage(GameEvent.JOIN_REQUEST)
  handleJoinRequest(@ConnectedSocket() client: Socket, @MessageBody() gjd: GameJoinDto): boolean {
    try{
      this.gameManager.validateJoinRequest(gjd);
      return true;
    } catch(e){
      this.logger.warn(`Player ${gjd.userName} could not join game ${gjd.gameUid}: ${e}`);
      return false;
    }
  }

  @SubscribeMessage(GameEvent.JOIN_GAME)
  handleJoinGame(@ConnectedSocket() client: Socket, @MessageBody() gjd: GameJoinDto) {
    this.logger.info(`Player ${gjd.userName} joined game ${gjd.gameUid}`);
    this.gameManager.addPlayerToGame(gjd);

    const gameState = this.gameManager.getAnyGame(gjd.gameUid).getGameState();

    this.server.to(gjd.gameUid).emit(GameEvent.GAME_STATE, gameState);
    this.server.emit(GameEvent.GAMES_UPDATE, this.gameManager.getOpenGames());
    client.join(gjd.gameUid);
  }

  @SubscribeMessage(GameEvent.GAME_INFO)
  handleGameInfo(@ConnectedSocket() client: Socket, @MessageBody() playerUid: {playerUid: string}) {
    const gameState = this.gameManager.getGameStateByPlayer(playerUid.playerUid);

    if(!gameState) throw new Error(`Player ${playerUid.playerUid} not in a game`);

    client.emit(GameEvent.GAME_INFO, gameState);
  }

  @SubscribeMessage(GameEvent.START_GAME)
  handleStartGame(@ConnectedSocket() client: Socket, @MessageBody() gameUid: {gameId: string}) {
    this.logger.info(`Starting game ${gameUid.gameId}`);

    const gameState = this.gameManager.startGame(gameUid.gameId);
    this.server.to(gameUid.gameId).emit(GameEvent.GAME_STATE, gameState);
  }

  @SubscribeMessage(GameEvent.LAY_CARD)
  handleLayCard(@MessageBody() lcd: GameLayCardDto){
    this.logger.info(`Player ${lcd.userUid} lays card ${lcd.card} in game ${lcd.gameUid}`);

    try{
      const game = this.gameManager.getRunningGame(lcd.gameUid);
      game.layCard(lcd.userUid, lcd.card, lcd.stack);

      this.server.to(lcd.gameUid).emit(GameEvent.GAME_STATE, game.getGameState());
    } catch(e){
        this.logger.warn(`Could not lay card ${lcd.card} in game ${lcd.gameUid}: ${e}`);
    }
  }

  @SubscribeMessage(GameEvent.END_ROUND)
  handleRoundEnd(@MessageBody() red: GameRoundEndDto){
    this.logger.info(`Player ${red.userUid} ends round in game ${red.gameUid}`);

    try{
        const game = this.gameManager.getRunningGame(red.gameUid);

        const gameState = game.endRoundOfPlayer(red.userUid);

        this.server.to(red.gameUid).emit(GameEvent.GAME_STATE, gameState);
        return true;
    } catch (e) {
        this.logger.warn(`Could not end round in game ${red.gameUid}: ${e}`);
        return false;
    }
  }

  @SubscribeMessage(ChatEvent.INGAME_CHAT_HISTORY)
  handleIngameChatHistory(@ConnectedSocket() client: Socket, @MessageBody() gameUid: {gameUid: string}){
    const game = this.gameManager.getAnyGame(gameUid.gameUid);
    const chatHistory = game.getChat();
    client.emit(ChatEvent.INGAME_CHAT_HISTORY, chatHistory);
  }

  @SubscribeMessage(ChatEvent.INGAME_MESSAGE)
  handleIngameMessage(@MessageBody() ingameMessage: IngameMessage){
    const {gameUid, ...message} = ingameMessage;

    const game = this.gameManager.getAnyGame(gameUid);
    game.newMessage(message);

    this.server.to(gameUid).emit(ChatEvent.INGAME_MESSAGE, message);
  }
}

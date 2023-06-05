import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {GameProgress} from '@the-game/common/dist/enum/game/gameProgress.enum';
import {ChatEvent} from '@the-game/common/dist/enum/websockets/events/chat-event.enum';
import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {SystemEvent} from '@the-game/common/dist/enum/websockets/events/system-event.enum';
import {WebsocketNamespace} from '@the-game/common/dist/enum/websockets/websocket-namespace.enum';
import {IngameMessage, Message} from '@the-game/common/dist/types/chat/message';
import {GameCreateDto} from '@the-game/common/dist/types/game/GameCreateDto';
import {GameDeleteDto} from '@the-game/common/dist/types/game/GameDeleteDto';
import {GameInterventionDto} from '@the-game/common/dist/types/game/GameInterventionDto';
import {GameJoinDto} from '@the-game/common/dist/types/game/GameJoinDto';
import {GameLayCardDto} from '@the-game/common/dist/types/game/GameLayCardDto';
import {GameRoundEndDto} from '@the-game/common/dist/types/game/GameRoundEndDto';
import {UserAnnouncement} from '@the-game/common/dist/types/playerOverview/userAnnouncement';
import {GamesService} from '../data/games/games.service';
import {IngameChatsService} from '../data/ingame-chat/ingame-chats.service';
import {InterventionsService} from '../data/interventions/interventions.service';
import {GameManager} from '../managers/game.manager';
import {LobbyManager} from '../managers/lobby.manager';
import { LoggerService } from '../common/logger/logger.service';
import {ChatsService} from '../data/chats/chats.service';
import {Server, Socket} from 'socket.io';

@WebSocketGateway({
  namespace: WebsocketNamespace.THE_GAME,
  port: 9000,
  cors: {
    origin: '*',
  },
})
export class ThegameGateway implements OnGatewayConnection, OnGatewayDisconnect {

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
    this.logger.setContext(ThegameGateway.name);
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
  async handleCreateGame(@MessageBody() gcd: GameCreateDto): Promise<void> {
    const game = this.gameManager.createGame(gcd.creator, gcd.mode, gcd.numberOfPlayers);
    this.logger.info(`Creating game for mode ${gcd.mode} with ${gcd.numberOfPlayers} players`);

    this.server.emit(GameEvent.GAMES_UPDATE, this.gameManager.getAllGames());

    await this.gamesService.create(game.getPersistableGameState());
  }

  @SubscribeMessage(GameEvent.DELETE_GAME)
  async handleDeleteGame(@MessageBody() gdd: GameDeleteDto): Promise<boolean> {
    try{
      const game = this.gameManager.deleteGame(gdd.gameUid);
      this.logger.info(`Deleting game ${gdd.gameUid}`);

      this.server.emit(GameEvent.GAMES_UPDATE, this.gameManager.getAllGames());

      await this.gamesService.delete(game.uid);

      return true;
    } catch(e){
      this.logger.warn(`Could not delete game ${gdd.gameUid}: ${e}`);
      return false;
    }
  }

  @SubscribeMessage(GameEvent.GET_GAMES)
  handleGetGames(@ConnectedSocket() client: Socket): void {
    this.logger.info(`Sending ${this.gameManager.getAllGames().length} open games to client ${client.id}`);
    client.emit(GameEvent.GAMES_UPDATE, this.gameManager.getAllGames());
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
  async handleJoinGame(@ConnectedSocket() client: Socket, @MessageBody() gjd: GameJoinDto) {
    this.logger.info(`Player ${gjd.userName} joined game ${gjd.gameUid}`);

    this.gameManager.addPlayerToGame(gjd);

    const game = this.gameManager.getAnyGame(gjd.gameUid);

    if(game.progress === GameProgress.LOST || game.progress === GameProgress.WON){
      this.gameManager.deleteGame(gjd.gameUid);
    }

    this.server.to(gjd.gameUid).emit(GameEvent.GAME_STATE, game.getGameState());
    this.server.emit(GameEvent.GAMES_UPDATE, this.gameManager.getAllGames());
    client.join(gjd.gameUid);

    await this.gamesService.update(game.getPersistableGameState());
  }

  @SubscribeMessage(GameEvent.GAME_INFO)
  handleGameInfo(@ConnectedSocket() client: Socket, @MessageBody() playerUid: {playerUid: string}) {
    const gameState = this.gameManager.getGameStateByPlayer(playerUid.playerUid);

    if(!gameState) throw new Error(`Player ${playerUid.playerUid} not in a game`);

    client.emit(GameEvent.GAME_INFO, gameState);
  }

  @SubscribeMessage(GameEvent.START_GAME)
  async handleStartGame(@ConnectedSocket() client: Socket, @MessageBody() gameUid: {gameId: string}) {
    this.logger.info(`Starting game ${gameUid.gameId}`);

    const game = this.gameManager.startGame(gameUid.gameId);
    this.server.emit(GameEvent.GAMES_UPDATE, this.gameManager.getAllGames());
    this.server.to(gameUid.gameId).emit(GameEvent.GAME_STATE, game.getGameState());
    await this.gamesService.update(game.getPersistableGameState());
  }

  @SubscribeMessage(GameEvent.LAY_CARD)
  async handleLayCard(@MessageBody() lcd: GameLayCardDto){
    this.logger.info(`Player ${lcd.userUid} lays card ${lcd.card} in game ${lcd.gameUid}`);

    try{
      const game = this.gameManager.getRunningGame(lcd.gameUid);
      game.playCard(lcd.userUid, lcd.card, lcd.stack);

      this.server.to(lcd.gameUid).emit(GameEvent.GAME_STATE, game.getGameState());

      if(game.hasEnded()){
        this.gameManager.deleteGame(game.uid);
      }

      await this.gamesService.update(game.getPersistableGameState());
    } catch(e){
        this.logger.warn(`Could not lay card ${lcd.card} in game ${lcd.gameUid}: ${e}`);
    }
  }

  @SubscribeMessage(GameEvent.END_ROUND)
  async handleRoundEnd(@MessageBody() red: GameRoundEndDto): Promise<Boolean>{
    this.logger.info(`Player ${red.userUid} ends round in game ${red.gameUid}`);

    try{
        const game = this.gameManager.getRunningGame(red.gameUid);

        const gameState = game.endRoundOfPlayer(red.userUid);

        this.server.to(red.gameUid).emit(GameEvent.GAME_STATE, gameState);

        if(game.hasEnded()){
          this.gameManager.deleteGame(game.uid);
        }

        await this.gamesService.update(game.getPersistableGameState());
        return true;
    } catch (e) {
        this.logger.warn(`Could not end round in game ${red.gameUid}: ${e}`);
        return false;
    }
  }

  @SubscribeMessage(ChatEvent.INGAME_CHAT_HISTORY)
  async handleIngameChatHistory(@ConnectedSocket() client: Socket, @MessageBody() gameUid: {gameUid: string}){
    const game = this.gameManager.getAnyGame(gameUid.gameUid);
    const chatHistory = await this.ingameChatsService.findAllForGame(game.uid);
    client.emit(ChatEvent.INGAME_CHAT_HISTORY, chatHistory);
  }

  @SubscribeMessage(ChatEvent.INGAME_MESSAGE)
  async handleIngameMessage(@MessageBody() ingameMessage: IngameMessage){
    const {gameUid, ...message} = ingameMessage;
    this.gameManager.getAnyGame(gameUid);

    this.server.to(gameUid).emit(ChatEvent.INGAME_MESSAGE, message);

    await this.ingameChatsService.create(ingameMessage);
  }

  @SubscribeMessage(GameEvent.SAVE_INTERVENTION)
  async handleSaveIntervention(@MessageBody() intervention: GameInterventionDto){
    this.logger.info(`Save Intervention from player ${intervention.playerUid} in game ${intervention.gameUid} for stack ${intervention.stackIndex}`);

    const game = this.gameManager.getRunningGame(intervention.gameUid);
    if(!game) throw new Error(`Game ${intervention.gameUid} not running`);

    this.server.to(intervention.gameUid).emit(GameEvent.SAVE_INTERVENTION, intervention);

    await this.interventionsService.create(intervention);
  }

  @SubscribeMessage(GameEvent.BLOCK_INTERVENTION)
  async handleBlockIntervention(@MessageBody() intervention: GameInterventionDto){
    this.logger.info(`Block Intervention from player ${intervention.playerUid} in game ${intervention.gameUid} for stack ${intervention.stackIndex}`);

    const game = this.gameManager.getRunningGame(intervention.gameUid);
    if(!game) throw new Error(`Game ${intervention.gameUid} not running`);

    this.server.to(intervention.gameUid).emit(GameEvent.BLOCK_INTERVENTION, intervention);

    await this.interventionsService.create(intervention);
  }

  @SubscribeMessage(GameEvent.INTERVENTION_HISTORY)
  async handleInterventionHistory(@ConnectedSocket() client: Socket, @MessageBody() gameUid: {gameUid: string}){
    const game = this.gameManager.getAnyGame(gameUid.gameUid);
    const interventionHistory = await this.interventionsService.findAllForGame(game.uid);
    client.emit(GameEvent.INTERVENTION_HISTORY, interventionHistory);
  }
}

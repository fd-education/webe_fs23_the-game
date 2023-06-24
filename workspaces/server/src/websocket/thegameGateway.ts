import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection, OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer, WsException,
} from '@nestjs/websockets';
import {GameProgress} from '@the-game/common/dist/enum/game/gameProgress.enum';
import {ChatEvent} from '@the-game/common/dist/enum/websockets/events/chat-event.enum';
import {GameEvent} from '@the-game/common/dist/enum/websockets/events/game-event.enum';
import {LobbyEvent} from '@the-game/common/dist/enum/websockets/events/lobby-event.enum';
import {WebsocketNamespace} from '@the-game/common/dist/enum/websockets/websocket-namespace.enum';
import {IngameMessage, Message} from '@the-game/common/dist/types/chat/message';
import {GameCreateDto} from '@the-game/common/dist/types/game/GameCreateDto';
import {GameDeleteDto} from '@the-game/common/dist/types/game/GameDeleteDto';
import {GameInterventionDto} from '@the-game/common/dist/types/game/GameInterventionDto';
import {GameJoinDto} from '@the-game/common/dist/types/game/GameJoinDto';
import {GamePlayCardDto} from '@the-game/common/dist/types/game/GamePlayCardDto';
import {GameRoundEndDto} from '@the-game/common/dist/types/game/GameRoundEndDto';
import {PlayerAnnouncementDto} from '@the-game/common/dist/types/lobby/PlayerAnnouncementDto';
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
export class TheGameGateway implements OnGatewayConnection, OnGatewayDisconnect {

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
    this.logger.setContext(TheGameGateway.name);
  }

  async handleConnection(client: any, ...args: any[]): Promise<any> {
    this.logger.info(`Client ${client.id} connected to ${WebsocketNamespace.THE_GAME}-namespace`);
  }

  async handleDisconnect(client: any): Promise<any> {
    this.lobbyManager.removeClient(client.id);
    this.logger.info(`Client ${client.id} disconnected from ${WebsocketNamespace.THE_GAME}-namespace`);

    this.server.emit(LobbyEvent.PLAYERS_UPDATE, this.lobbyManager.getClients());
  }

  @SubscribeMessage(LobbyEvent.NEW_PLAYER)
  handlePlayerAnnouncement(@ConnectedSocket() client: Socket, @MessageBody() message: PlayerAnnouncementDto): void {
    this.lobbyManager.addClient(client.id, message, client);
    this.logger.info(`Client ${client.id} announced itself as ${message.username}`);

    this.server.emit(LobbyEvent.PLAYERS_UPDATE, this.lobbyManager.getClients());
  }

  @SubscribeMessage(ChatEvent.GLOBAL_MESSAGE)
  async handleMessage(@MessageBody() message: Message): Promise<void> {
    this.logger.info(`Received message ${message.message} from ${message.authorName}`);
    this.server.emit(ChatEvent.GLOBAL_MESSAGE, message);

    await this.chatsService.create(message);
  }

  @SubscribeMessage(ChatEvent.GLOBAL_CHAT_HISTORY)
  async handleChatHistory(@ConnectedSocket() client: Socket): Promise<void> {
    const chatHistory = await this.chatsService.findAll();
    this.logger.info(`Sending ${chatHistory.length} chat messages to client ${client.id}`)
    client.emit(ChatEvent.GLOBAL_CHAT_HISTORY, chatHistory);
  }

  @SubscribeMessage(LobbyEvent.PLAYERS_UPDATE)
  async handlePlayersUpdate(@ConnectedSocket() client: Socket): Promise<void> {
    const clients = this.lobbyManager.getClients();
    this.logger.info(`Sending ${clients.length} connected players to client ${client.id}`)
    client.emit(LobbyEvent.PLAYERS_UPDATE, clients);
  }

  @SubscribeMessage(GameEvent.CREATE_GAME)
  async handleCreateGame(@MessageBody() gcd: GameCreateDto): Promise<void> {
    try{
      const game = this.gameManager.createGame(gcd.creator, gcd.mode, gcd.numberOfPlayers);
      this.logger.info(`Creating game for mode ${gcd.mode} with ${gcd.numberOfPlayers} players`);

      this.server.emit(GameEvent.GAMES_UPDATE, this.gameManager.getAllGames());

      await this.gamesService.create(game.getPersistableGameState());
    } catch(e){
      this.logger.warn(`Cannot create new game for ${gcd.creator}: ${e.message}`)
      throw new WsException(e.message);
    }
  }

  @SubscribeMessage(GameEvent.DELETE_GAME)
  async handleDeleteGame(@MessageBody() gdd: GameDeleteDto): Promise<void> {
    try{
      const game = this.gameManager.deleteGame(gdd.gameUid, gdd.userUid, false);
      this.logger.info(`Deleting game ${gdd.gameUid}`);

      this.server.emit(GameEvent.GAMES_UPDATE, this.gameManager.getAllGames());

      await this.gamesService.delete(game.uid);
    } catch(e){
      this.logger.warn(`Could not delete game ${gdd.gameUid}: ${e.message}`);
      throw new WsException(e.message);
    }
  }

  @SubscribeMessage(GameEvent.GAMES_UPDATE)
  handleGetGames(@ConnectedSocket() client: Socket): void {
    this.logger.info(`Sending ${this.gameManager.getAllGames().length} open games to client ${client.id}`);
    client.emit(GameEvent.GAMES_UPDATE, this.gameManager.getAllGames());
  }

  @SubscribeMessage(GameEvent.JOIN_GAME)
  async handleJoinGame(@ConnectedSocket() client: Socket, @MessageBody() gjd: GameJoinDto): Promise<boolean> {
    try{
      this.logger.info(`Player ${gjd.userName} joined game ${gjd.gameUid}`);

      this.gameManager.addPlayerToGame(gjd);

      const game = this.gameManager.getAnyGame(gjd.gameUid);

      if(game.hasEnded()){
        this.gameManager.deleteGame(gjd.gameUid, gjd.userUid, true);
      }

      this.server.to(gjd.gameUid).emit(GameEvent.GAME_STATE, game.getGameState());
      this.server.emit(GameEvent.GAMES_UPDATE, this.gameManager.getAllGames());
      client.join(gjd.gameUid);

      await this.gamesService.update(game.getPersistableGameState());

      return true;
    } catch(e){
      this.logger.warn(`Player ${gjd.userName} could not join game ${gjd.gameUid}: ${e.message}`);
      throw new WsException(e.message);
    }
  }

  @SubscribeMessage(GameEvent.GAME_INFO)
  handleGameInfo(@ConnectedSocket() client: Socket, @MessageBody() playerUid: {playerUid: string}) {
    try{
      const gameState = this.gameManager.getGameStateByPlayer(playerUid.playerUid);

      client.join(gameState.gameId);
      client.emit(GameEvent.GAME_STATE, gameState);
      this.logger.info(`Sending game info for game ${gameState.gameId} requested by player ${playerUid.playerUid}`);
    } catch(e){
      this.logger.warn(`Cannot send game info requested by player ${playerUid.playerUid}: ${e.message}`);
      throw new WsException(e.message);
    }
  }

  @SubscribeMessage(GameEvent.START_GAME)
  async handleStartGame(@ConnectedSocket() client: Socket, @MessageBody() gameUid: {gameId: string}) {
    try{
      const game = this.gameManager.startGame(gameUid.gameId);
      this.server.emit(GameEvent.GAMES_UPDATE, this.gameManager.getAllGames());
      this.server.to(gameUid.gameId).emit(GameEvent.GAME_STATE, game.getGameState());

      this.logger.info(`Starting game ${gameUid.gameId}`);
      await this.gamesService.update(game.getPersistableGameState());
    } catch(e){
      this.logger.warn(`Cannot start game ${gameUid.gameId}: ${e.message}`);
      throw new WsException(e.message);
    }
  }

  @SubscribeMessage(GameEvent.PLAY_CARD)
  async handlePlayCard(@MessageBody() lcd: GamePlayCardDto){
    this.logger.info(`Player ${lcd.userUid} plays card ${lcd.card} in game ${lcd.gameUid}`);

    try{
      const game = this.gameManager.getRunningGame(lcd.gameUid);
      game.playCard(lcd.userUid, lcd.card, lcd.stack);

      this.server.to(lcd.gameUid).emit(GameEvent.GAME_STATE, game.getGameState());

      if(game.hasEnded()){
        this.gameManager.deleteGame(game.uid, lcd.userUid, true);
      }

      await this.gamesService.update(game.getPersistableGameState());
      this.logger.info(`Updated state for card ${lcd.card} in game ${lcd.gameUid}`);
    } catch(e){
        this.logger.warn(`Could not play card ${lcd.card} in game ${lcd.gameUid}: ${e.message}`);
        throw new WsException(e.message);
    }
  }

  @SubscribeMessage(GameEvent.END_ROUND)
  async handleRoundEnd(@MessageBody() red: GameRoundEndDto) {
    this.logger.info(`Player ${red.userUid} ends round in game ${red.gameUid}`);

    try{
        const game = this.gameManager.getRunningGame(red.gameUid);

        const gameState = game.endRoundOfPlayer(red.userUid);

        this.server.to(red.gameUid).emit(GameEvent.GAME_STATE, gameState);

        if(game.hasEnded()){
          this.gameManager.deleteGame(game.uid, red.userUid, true);
        }

        await this.gamesService.update(game.getPersistableGameState());
    } catch (e) {
        this.logger.warn(`Could not end round in game ${red.gameUid}: ${e.message}`);
        throw new WsException(e.message);
    }
  }

  @SubscribeMessage(ChatEvent.INGAME_CHAT_HISTORY)
  async handleIngameChatHistory(@ConnectedSocket() client: Socket, @MessageBody() gameUid: {gameUid: string}){
    try{
      const game = this.gameManager.getAnyGame(gameUid.gameUid);
      const chatHistory = await this.ingameChatsService.findAllForGame(game.uid);
      client.emit(ChatEvent.INGAME_CHAT_HISTORY, chatHistory);
    } catch(e){
      this.logger.warn(`Could not create chat history for game ${gameUid.gameUid}: ${e.message}`);
      throw new WsException(e.message);
    }
  }

  @SubscribeMessage(ChatEvent.INGAME_MESSAGE)
  async handleIngameMessage(@MessageBody() ingameMessage: IngameMessage){
    try{
      const {gameUid, ...message} = ingameMessage;
      this.gameManager.getAnyGame(gameUid);

      this.server.to(gameUid).emit(ChatEvent.INGAME_MESSAGE, message);

      await this.ingameChatsService.create(ingameMessage);
    } catch(e) {
      this.logger.warn(`Could not handle ingame message for game ${ingameMessage.gameUid} by user ${ingameMessage.authorUid}: ${e.message}`);
      throw new WsException(e.message);
    }
  }

  @SubscribeMessage(GameEvent.SAVE_INTERVENTION)
  async handleSaveIntervention(@MessageBody() intervention: GameInterventionDto){
    try{
      this.logger.info(`Save Intervention from player ${intervention.playerUid} in game ${intervention.gameUid} for stack ${intervention.stackIndex}`);

      this.gameManager.getRunningGame(intervention.gameUid);

      this.server.to(intervention.gameUid).emit(GameEvent.SAVE_INTERVENTION, intervention);

      await this.interventionsService.create(intervention);
    } catch(e){
      this.logger.warn(`Could not handle ingame message for game ${intervention.gameUid} by user ${intervention.playerUid}: ${e.message}`);
      throw new WsException(e.message);
    }
  }

  @SubscribeMessage(GameEvent.BLOCK_INTERVENTION)
  async handleBlockIntervention(@MessageBody() intervention: GameInterventionDto){
    try{
      this.logger.info(`Block Intervention from player ${intervention.playerUid} in game ${intervention.gameUid} for stack ${intervention.stackIndex}`);

      this.gameManager.getRunningGame(intervention.gameUid);

      this.server.to(intervention.gameUid).emit(GameEvent.BLOCK_INTERVENTION, intervention);

      await this.interventionsService.create(intervention);
    } catch(e){
      this.logger.warn(`Could not handle ingame message for game ${intervention.gameUid} by user ${intervention.playerUid}: ${e.message}`);
      throw new WsException(e.message);
    }
  }

  @SubscribeMessage(GameEvent.INTERVENTION_HISTORY)
  async handleInterventionHistory(@ConnectedSocket() client: Socket, @MessageBody() gameUid: {gameUid: string}){
    try{
      const game = this.gameManager.getAnyGame(gameUid.gameUid);
      const interventionHistory = await this.interventionsService.findAllForGame(game.uid);
      client.emit(GameEvent.INTERVENTION_HISTORY, interventionHistory);
    } catch(e){
      this.logger.warn(`Could not create intervention history for game ${gameUid.gameUid}: ${e.message}`);
      throw new WsException(e.message);
    }
  }
}

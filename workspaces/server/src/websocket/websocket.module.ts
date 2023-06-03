import { Module } from '@nestjs/common';
import {ConfigModule} from '../common/config/config.module';
import {GamesModule} from '../data/games/games.module';
import {IngameChatsModule} from '../data/ingame-chat/ingame-chats.module';
import {GameManager} from '../managers/game.manager';
import {LobbyManager} from '../managers/lobby.manager';
import {ChatsModule} from '../data/chats/chats.module';
import {UsersModule} from '../data/users/users.module';
import {OwnJwtModule} from '../security/jwt/jwt.module';
import { ThegameGateway } from './thegame.gateway';
import { LoggerService } from '../common/logger/logger.service';

@Module({
  imports: [ConfigModule, OwnJwtModule, UsersModule, GamesModule, ChatsModule, IngameChatsModule],
  providers: [ThegameGateway, LoggerService, LobbyManager, GameManager],
})
export class WebsocketModule {}

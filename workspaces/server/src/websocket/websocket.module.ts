import { Module } from '@nestjs/common';
import {ConfigModule} from '../common/config/config.module';
import {GamesModule} from '../data/games/games.module';
import {IngameChatsModule} from '../data/ingame-chat/ingame-chats.module';
import {InterventionsModule} from '../data/interventions/interventions.module';
import {GameManager} from '../managers/game.manager';
import {LobbyManager} from '../managers/lobby.manager';
import {ChatsModule} from '../data/chats/chats.module';
import {UsersModule} from '../data/users/users.module';
import {OwnJwtModule} from '../security/jwt/jwt.module';
import { TheGameGateway } from './thegameGateway';
import { LoggerService } from '../common/logger/logger.service';

@Module({
  imports: [ConfigModule, OwnJwtModule, UsersModule, GamesModule, ChatsModule, IngameChatsModule, InterventionsModule],
  providers: [TheGameGateway, LoggerService, LobbyManager, GameManager],
})
export class WebsocketModule {}

import { Module } from '@nestjs/common';
import {ConfigModule} from '../common/config/config.module';
import {LobbyManager} from '../common/managers/lobby.manager';
import {ChatsModule} from '../data/chats/chats.module';
import {GamesModule} from '../data/games/games.module';
import {UsersModule} from '../data/users/users.module';
import {OwnJwtModule} from '../security/jwt/jwt.module';
import {JwtVerifyService} from '../security/jwt/jwt.service';
import { LobbyGateway } from './lobby.gateway';
import { LoggerService } from '../common/logger/logger.service';

@Module({
  imports: [ConfigModule, OwnJwtModule, UsersModule, GamesModule, ChatsModule],
  providers: [LobbyGateway, LoggerService, JwtVerifyService, LobbyManager],
})
export class WebsocketModule {}

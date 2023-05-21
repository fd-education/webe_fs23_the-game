import { Module } from '@nestjs/common';
import {ConfigModule} from '../common/config/config.module';
import {GameManager} from '../common/managers/game.manager';
import {LobbyManager} from '../common/managers/lobby.manager';
import {ChatsModule} from '../data/chats/chats.module';
import {GameLobbiesModule} from '../data/gamelobbies/game-lobbies.module';
import {UsersModule} from '../data/users/users.module';
import {OwnJwtModule} from '../security/jwt/jwt.module';
import {JwtVerifyService} from '../security/jwt/jwt.service';
import { TheGameGateway } from './the-game.gateway';
import { LoggerService } from '../common/logger/logger.service';

@Module({
  imports: [ConfigModule, OwnJwtModule, UsersModule, GameLobbiesModule, ChatsModule],
  providers: [TheGameGateway, LoggerService, JwtVerifyService, LobbyManager, GameManager],
})
export class WebsocketModule {}

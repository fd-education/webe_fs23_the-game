import { Module } from '@nestjs/common';
import {ConfigModule} from '../common/config/config.module';
import {GameManager} from '../managers/game.manager';
import {LobbyManager} from '../managers/lobby.manager';
import {ChatsModule} from '../data/chats/chats.module';
import {GameLobbiesModule} from '../data/gamelobbies/game-lobbies.module';
import {UsersModule} from '../data/users/users.module';
import {OwnJwtModule} from '../security/jwt/jwt.module';
import {JwtVerifyService} from '../security/jwt/jwt.service';
import { ThegameGateway } from './thegame.gateway';
import { LoggerService } from '../common/logger/logger.service';

@Module({
  imports: [ConfigModule, OwnJwtModule, UsersModule, GameLobbiesModule, ChatsModule],
  providers: [ThegameGateway, LoggerService, LobbyManager, GameManager],
})
export class WebsocketModule {}

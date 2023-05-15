import { Module } from '@nestjs/common';
import {ConfigModule} from '../common/config/config.module';
import {GamesModule} from '../data/games/games.module';
import {UsersModule} from '../data/users/users.module';
import {OwnJwtModule} from '../security/jwt/jwt.module';
import {JwtVerifyService} from '../security/jwt/jwt.service';
import { LobbyGateway } from './lobby.gateway';
import { LoggerService } from '../common/logger/logger.service';

@Module({
  imports: [ConfigModule, OwnJwtModule, UsersModule, GamesModule],
  providers: [LobbyGateway, LoggerService, JwtVerifyService],
})
export class WebsocketModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from '../../common/logger/logger.module';
import {GameLobbiesSchema, GameLobby} from './game-lobby.schema';
import {GameLobbyService} from './game-lobby.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: GameLobby.name, schema: GameLobbiesSchema }]),
        LoggerModule,
    ],
    providers: [GameLobbyService],
    exports: [GameLobbyService],
})
export class GameLobbiesModule {}

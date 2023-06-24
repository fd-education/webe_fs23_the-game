import {Module} from '@nestjs/common';
import {GamesModule} from '../data/games/games.module';
import {GameManager} from './game.manager';
import {LobbyManager} from './lobby.manager';

@Module({
    imports: [GamesModule],
    providers: [LobbyManager,GameManager],
    })
export class ManagersModule {
}
import {Module} from '@nestjs/common';
import {GameManager} from './game.manager';
import {LobbyManager} from './lobby.manager';

@Module({
    providers: [LobbyManager,GameManager],
    })
export class ManagersModule {
}
import {Module} from '@nestjs/common';
import {LobbyManager} from './lobby.manager';

@Module({
    providers: [LobbyManager],
    })
export class ManagersModule {
}
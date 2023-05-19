import {Injectable} from '@nestjs/common';

type playerData = {
    uid: string,
    username: string;
}

@Injectable()
export class LobbyManager {
    private readonly globalLobby: Map<string, playerData> = new Map<string, playerData>();

    constructor() {

    }

    public addClient(socketId: string, clientData: playerData) {
        this.globalLobby.set(socketId, clientData);
    }

    public removeClient(socketId: string): void {
        this.globalLobby.delete(socketId);
    }

    public getClients(): playerData[] {
        return Array.from(this.globalLobby.values());
    }
}
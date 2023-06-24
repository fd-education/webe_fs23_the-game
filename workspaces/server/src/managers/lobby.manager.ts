import {Injectable} from '@nestjs/common';
import {Socket} from 'socket.io';

type UserData = {
    uid: string,
    username: string;
}

@Injectable()
export class LobbyManager {
    private readonly globalLobby: Map<string, {user: UserData, socket: Socket}> = new Map<string, {user: UserData, socket: Socket}>();

    constructor() {

    }

    public addClient(socketId: string, user: UserData, socket: Socket) {
        this.globalLobby.set(socketId, {user, socket});
    }

    public removeClient(socketId: string): void {
        this.globalLobby.delete(socketId);
    }

    public getClients(): UserData[] {
        const userData: UserData[] = [];

        for(let value of this.globalLobby.values()){
            userData.push(value.user);
        }

        return userData;
    }
}
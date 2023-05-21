import {Socket} from 'socket.io';

export class Player{
    private _uid: string;
    private _username: string;
    private _handCards: number[] = [];
    private socket: Socket;

    private isReady: boolean;

    constructor(uid: string, username: string, socket: Socket){
        this._uid = uid;
        this._username = username;
        this.socket = socket;
    }

    public setHandCards(cards: number[]){
        this._handCards = cards;
    }

    public setReady(){
        this.isReady = true;
    }

    public getReady(){
        return this.isReady;
    }

    public emit(event: string, data: any){
        this.socket.emit(event, data);
    }

    get uid(): string {
        return this._uid;
    }

    get username(): string {
        return this._username;
    }

    get handCards(): number[] {
        return this._handCards;
    }
}
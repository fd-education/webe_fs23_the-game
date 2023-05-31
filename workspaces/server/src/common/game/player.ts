import {Socket} from 'socket.io';

export class Player{
    private _uid: string;
    private _username: string;
    private _handCards: number[] = [];

    private isReady: boolean;

    constructor(uid: string, username: string){
        this._uid = uid;
        this._username = username;
    }

    public setHandCards(cards: number[]){
        this._handCards = cards;
    }

    public addCard(card: number){
        this._handCards.push(card);
    }

    public removeCard(card: number){
        this._handCards = this._handCards.filter(c => c !== card);
    }

    public setReady(){
        this.isReady = true;
    }

    public getReady(){
        return this.isReady;
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
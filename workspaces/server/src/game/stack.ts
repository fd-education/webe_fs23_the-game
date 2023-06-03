import {StackDirection} from '@the-game/common/dist/enum/game/StackDirection';

export class Stack{


    private _id: number;
    private _cards: number[];
    private _direction: StackDirection;
    constructor(id: number, direction: StackDirection, cards?: number[]){
        this._id = id;
        this._direction = direction;

        this._cards = cards || [];
    }
    public addCard(card: number){
        this._cards.push(card);
    }

    public getCards(): number[]{
        return this._cards;
    }

    public getDirection(): StackDirection{
        return this._direction;
    }

    public getTopCard(): number{
        const topCard = this._cards[this._cards.length - 1];
        if(topCard === undefined) return -1;

        return this._cards[this._cards.length - 1];
    }

    public canLayCard(card: number): boolean{
        const topCard = this.getTopCard();
        if(topCard === undefined) return true;
        if(topCard === -1) return true;

        if(this._direction === StackDirection.UP){
            if(card > topCard) return true;
            if(card === topCard - 10) return true;
        } else {
            if(card < topCard) return true;
            if(card === topCard + 10) return true;
        }

        return false;
    }

    get id(): number {
        return this._id;
    }

    get cards(): number[] {
        return this._cards;
    }
    get direction(): StackDirection{
        return this._direction;
    }
}
import {StackDirection} from '@the-game/common/dist/enum/game/StackDirection';

export class Stack{
    private id: number;
    private cards: number[];
    private direction: StackDirection;
    constructor(id: number, direction: StackDirection){
        this.id = id;
        this.direction = direction;

        this.cards = [];
    }
    public addCard(card: number){
        this.cards.push(card);
    }

    public getCards(): number[]{
        return this.cards;
    }

    public getTopCard(): number{
        const topCard = this.cards[this.cards.length - 1];
        if(topCard === undefined) return -1;

        return this.cards[this.cards.length - 1];
    }

    public canLayCard(card: number): boolean{
        const topCard = this.getTopCard();
        if(topCard === undefined) return true;
        if(topCard === -1) return true;

        if(this.direction === StackDirection.UP){
            if(card > topCard) return true;
            if(card === topCard - 10) return true;
        } else {
            if(card < topCard) return true;
            if(card === topCard + 10) return true;
        }

        return false;
    }
}
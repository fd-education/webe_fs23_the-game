class Stack{
    private id: number;
    private cards: number[];
    constructor(id: number){
        this.id = id;
        this.cards = [];
    }
    public addCard(card: number){
        this.cards.push(card);
    }
    public getCards(): number[]{
        return this.cards;
    }

    public getTopCard(): number{
        return this.cards[this.cards.length - 1];
    }
}
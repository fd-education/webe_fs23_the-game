import {specialCards} from '@the-game/common/dist/constants/special-cards';
import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {StackDirection} from '@the-game/common/dist/enum/game/StackDirection';
import {GameState} from '@the-game/common/dist/types/game/GameState';
import {Player} from './player';
import {Stack} from './stack';
import { v4 as uuidv4 } from 'uuid';

export class Game{
    private readonly _uid: string;
    private readonly _creator: string;
    private readonly _mode: GameMode;
    private readonly _playerLimit: number;
    private readonly _players: Player[];
    private readonly stacks: Stack[];
    private _started: boolean = false;

    private pullStack: number[];
    private numberOfHandcards: number;

    private isNewRound: boolean;
    private cardsLaidInRound: number;
    private roundCounter: number;

    private dangerRound: boolean;

    constructor(creator: string, gameMode: GameMode, playerLimit: number){
        this._uid = uuidv4();
        this._creator = creator;
        this._playerLimit = playerLimit;
        this._mode = gameMode;

        this._players = [];
        this.stacks = [];
    }

    public joinPlayer(player: Player){
        if(this._started) throw new Error('Game already started');
        if(this._players.length >= this._playerLimit) throw new Error('Game is full');

        const playerIndex = this._players.findIndex(p => p.uid === player.uid);

        if(playerIndex !== -1){
            return this._players[playerIndex];
        }

        this._players.push(player);
        return player;
    }

    public startGame(){
        this._started = true;
        this.numberOfHandcards = this._players.length === 1 ? 8 : this._players.length === 2? 7 : 6;

        this.stacks.push(new Stack(0, StackDirection.DOWN));
        this.stacks.push(new Stack(1, StackDirection.UP));
        this.stacks.push(new Stack(2, StackDirection.DOWN));
        this.stacks.push(new Stack(3, StackDirection.UP));

        this.roundCounter = 0;
        this.cardsLaidInRound = 0;
        this.isNewRound = true;

        this.pullStack = this.generateCards();
        this.dealCards();
    }

    public getGameState(): GameState {
        const players = []

        for(let player of this._players){
            players.push({
                playerId: player.uid,
                name: player.username,
                handCards: player.handCards
            });
        }

        return {
            gameId: this.uid,
            gameMode: this._mode,

            pickupStack: this.pullStack.length,

            stack1: this.stacks[0].getTopCard(),
            stack2: this.stacks[1].getTopCard(),
            stack3: this.stacks[2].getTopCard(),
            stack4: this.stacks[3].getTopCard(),

            canRoundEnd: this.canRoundEnd(),

            playerAtTurn: this._players[this.roundCounter % this._players.length].uid,

            players: players
        }
    }

    public layCard(playerUid: string, card: number, stackIndex: number){
        if(stackIndex < 0 || stackIndex > 3) throw new Error('Invalid stack index');
        if(card < 2 || card > 99) throw new Error('Invalid card');
        if(!this._started) throw new Error('Game not started');

        const player = this._players.find(p => p.uid === playerUid);
        if(!player) throw new Error('Player not in game');
        if(player.handCards.findIndex(c => c === card) === -1) throw new Error('Player has not this card');

        const stack = this.stacks[stackIndex];
        if(!stack.canLayCard(card)) throw new Error('Invalid card for stack');

        this.cardsLaidInRound++;
        this.isNewRound = false;

        stack.addCard(card);
        player.removeCard(card);
    }

    public canRoundEnd(): boolean{
        const hasPullStackCondition = this.pullStack.length > 0 && this.cardsLaidInRound >= 2;
        const noPullStackCondition = this.pullStack.length === 0 && this.cardsLaidInRound >= 1;

        return !this.isNewRound && (hasPullStackCondition || noPullStackCondition);
    }

    public endRoundOfPlayer(playerUid: string){
        if(!this.canRoundEnd()) throw new Error('Round cannot end');

        const player = this._players.find(p => p.uid === playerUid);
        if(!player) throw new Error('Player not in game');

        const remainingCards = player.handCards;
        const newCards = this.pullStack.splice(0, this.numberOfHandcards - remainingCards.length);
        player.setHandCards(remainingCards.concat(newCards));

        // in singles games, cards must be dealt before checking for a game over
        if(this.isGameOver()) throw new Error('Game is over');

        this.cardsLaidInRound = 0;
        this.roundCounter++;
        this.isNewRound = true;

        this.dangerRound = this._mode === GameMode.ONFIRE && this.stacks.map(s => s.getTopCard()).some(c => specialCards.includes(c));

        return this.getGameState();
    }

    private isGameOver(): boolean{
        if(this._mode === GameMode.CLASSIC){
            return this.isGameOverClassic();
        } else {
            return this.isGameOverOnFire();
        }
    }

    private isGameOverClassic(): boolean{
        const nextPlayer =  this._players[(this.roundCounter + 1) % this._players.length];
        if(nextPlayer.handCards.length === 0) return true;

        const bottomUpStacks = this.stacks.filter(s => s.getDirection() === StackDirection.UP);
        const topDownStacks = this.stacks.filter(s => s.getDirection() === StackDirection.DOWN);

        const maxHandCard = Math.max(...nextPlayer.handCards);
        const minHandCard = Math.min(...nextPlayer.handCards);
        const minBottomUpStackCard = Math.min(...bottomUpStacks.map(s => s.getTopCard()));
        const maxTopDownStackCard = Math.max(...topDownStacks.map(s => s.getTopCard()));

        const bottomUpStacksDead = maxHandCard < minBottomUpStackCard;
        const topDownStacksDead = minHandCard > maxTopDownStackCard;

        const bottomUpSavePossible = bottomUpStacks.map(s => s.getTopCard()).some(c => nextPlayer.handCards.some(h => h === c - 10));
        const topDownSavePossible = topDownStacks.map(s => s.getTopCard()).some(c => nextPlayer.handCards.some(h => h === c + 10));

        return bottomUpStacksDead && topDownStacksDead && !bottomUpSavePossible && !topDownSavePossible;
    }

    private isGameOverOnFire(): boolean{
        const classicGameOver = this.isGameOverClassic();
        const specialCardsLeft = this.dangerRound && this.stacks.map(s => s.getTopCard()).some(c => specialCards.includes(c));

        return classicGameOver || specialCardsLeft;
    }

    private generateCards(): number[]{
        const cards: number[] = [];
        for(let i = 2; i < 99; i++){
            cards.push(i);
        }

        return cards
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
    }

    private dealCards(){
        for(let player of this._players){
            player.setHandCards(this.pullStack.splice(0, this.numberOfHandcards));
        }
    }

    get uid(): string {
        return this._uid;
    }

    get creator(): string {
        return this._creator;
    }

    get mode(): GameMode {
        return this._mode;
    }

    get playerLimit(): number {
        return this._playerLimit;
    }

    get players(): Player[] {
        return this._players;
    }

    get started(): boolean {
        return this._started;
    }
}
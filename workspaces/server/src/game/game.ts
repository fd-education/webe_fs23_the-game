import {specialCards} from '@the-game/common/dist/constants/special-cards';
import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {GameProgress} from '@the-game/common/dist/enum/game/gameProgress.enum';
import {StackDirection} from '@the-game/common/dist/enum/game/StackDirection';
import {GameState} from '@the-game/common/dist/types/game/GameState';
import {GameSchema} from '../data/games/games.schema';
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

    private _progress: GameProgress;

    private pullStack: number[];
    private numberOfHandcards: number;

    private isNewRound: boolean;
    private cardsLaidInRound: number;
    private roundCounter: number;

    private canRoundEnd: boolean;
    private dangerRound: boolean;

    constructor(
        creator: string,
        gameMode: GameMode,
        playerLimit: number,
        gameId?: string,
        numberOfHandcards?: number,
        progress?: GameProgress,
        stacks?: Stack[],
        roundCounter?: number,
        isNewRound?: boolean,
        canRoundEnd?: boolean,
        cardsLaidInRound?: number,
        dangerRound?: boolean,
        players?: Player[]
        )
    {
        this._uid = gameId || uuidv4();
        this._creator = creator;
        this._playerLimit = playerLimit;
        this._mode = gameMode;
        this.numberOfHandcards = numberOfHandcards || 0;

        this._progress = progress || GameProgress.OPEN;

        this.pullStack = [];

        this._players = [];
        this.stacks = stacks || [];
        this.roundCounter = roundCounter || 0;
        this.isNewRound = isNewRound || true;
        this.canRoundEnd = canRoundEnd || false;
        this.cardsLaidInRound = cardsLaidInRound || 0;
        this.dangerRound = dangerRound || false;

        this._players = players || [];
    }

    public joinPlayer(player: Player){
        if(this._players.some(p => p.uid === player.uid)) return player;

        if(this._progress !== GameProgress.OPEN) throw new Error('Game already started');
        if(this._players.length >= this._playerLimit) throw new Error('Game is full');

        const playerIndex = this._players.findIndex(p => p.uid === player.uid);

        if(playerIndex !== -1){
            return this._players[playerIndex];
        }

        this._players.push(player);
        return player;
    }

    public startGame(){
        this._progress = GameProgress.STARTED;
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
            progress: this._progress,

            creator: this._creator,
            numberOfPlayers: this._playerLimit,

            gameMode: this._mode,

            pickupStack: this.pullStack.length,

            stack1: this.stacks[0]?.getTopCard(),
            stack2: this.stacks[1]?.getTopCard(),
            stack3: this.stacks[2]?.getTopCard(),
            stack4: this.stacks[3]?.getTopCard(),

            canRoundEnd: this.canRoundEnd,

            playerAtTurn: this._players[this.roundCounter % this._players.length]?.uid,

            players: players
        }
    }

    public playCard(playerUid: string, card: number, stackIndex: number){
        if(stackIndex < 0 || stackIndex > 3) throw new Error('Invalid stack index');
        if(card < 2 || card > 99) throw new Error('Invalid card');
        if(this._progress === GameProgress.OPEN) throw new Error('Game not started');
        if(this._progress === GameProgress.WON || this._progress === GameProgress.LOST) throw new Error('Game already ended');

        const player = this._players.find(p => p.uid === playerUid);
        if(!player) throw new Error('Player not in game');
        if(player.handCards.findIndex(c => c === card) === -1) throw new Error('Player has not this card');

        const stack = this.stacks[stackIndex];
        if(!stack.canLayCard(card)) throw new Error('Invalid card for stack');

        this.cardsLaidInRound++;
        this.isNewRound = false;
        this.canRoundEnd = this.checkCanRoundEnd();

        stack.addCard(card);
        player.removeCard(card);

        if(this.isGameWon()){
            this._progress = GameProgress.WON;
        } else if(this.isGameLost()){
            this._progress = GameProgress.LOST;
        } else {
            this._progress = GameProgress.STARTED;
        }
    }

    public endRoundOfPlayer(playerUid: string){
        if(!this.checkCanRoundEnd) throw new Error('Round cannot end');
        if(this.hasEnded()) throw new Error('Game has ended');
        if(this._progress === GameProgress.OPEN) throw new Error('Game not started');

        const player = this._players.find(p => p.uid === playerUid);
        if(!player) throw new Error('Player not in game');

        this.roundCounter++;

        if(this.isGameWon()){
            this._progress = GameProgress.WON;
            return this.getGameState();
        }

        const remainingCards = player.handCards;
        const newCards = this.pullStack.splice(0, this.numberOfHandcards - remainingCards.length);
        player.setHandCards(remainingCards.concat(newCards));

        // in singles games, cards must be dealt before checking for a possibly lost game
        if(this.isGameLost()){
            this._progress = GameProgress.LOST;
            return this.getGameState();
        }

        this.cardsLaidInRound = 0;
        this.isNewRound = true;

        this.dangerRound = this._mode === GameMode.ONFIRE && this.stacks.map(s => s.getTopCard()).some(c => specialCards.includes(c));

        return this.getGameState();
    }

    public getPersistableGameState(): GameSchema{
        return {
            gameId: this.uid,
            creator: this._creator,
            numberOfPlayers: this._playerLimit,
            gameMode: this._mode,
            numberOfHandcards: this.numberOfHandcards,
            progress: this._progress,
            pickupStack: this.pullStack,
            stacks: this.stacks,
            roundCounter: this.roundCounter,
            canRoundEnd: this.canRoundEnd,
            isNewRound: this.isNewRound,
            cardsLaidInRound: this.cardsLaidInRound,
            dangerRound: this.dangerRound,
            players: this._players
        }
    }

    public hasEnded(){
        return this.progress !== GameProgress.STARTED && this.progress !== GameProgress.OPEN;
    }

    private checkCanRoundEnd(): boolean{
        const hasPullStackCondition = this.pullStack.length > 0 && this.cardsLaidInRound >= 2;
        const noPullStackCondition = this.pullStack.length === 0 && this.cardsLaidInRound >= 1;

        return !this.isNewRound && (hasPullStackCondition || noPullStackCondition);
    }

    private isGameWon(): boolean{
        const pullStackEmpty = this.pullStack.length === 0;
        const handCardsEmpty = this._players.every(p => p.handCards.length === 0);

        return pullStackEmpty && handCardsEmpty;
    }

    private isGameLost(): boolean{
        if(this._mode === GameMode.CLASSIC){
            return this.isGameLostClassic();
        } else {
            return this.isGameLostOnFire();
        }
    }

    private isGameLostClassic(): boolean{
        const player =  this._players[(this.roundCounter) % this._players.length];
        if(player.handCards.length === 0) return true;

        const bottomUpStacks = this.stacks.filter(s => s.getDirection() === StackDirection.UP);
        const topDownStacks = this.stacks.filter(s => s.getDirection() === StackDirection.DOWN);

        const maxHandCard = Math.max(...player.handCards);
        const minHandCard = Math.min(...player.handCards);
        const minBottomUpStackCard = Math.min(...bottomUpStacks.map(s => s.getTopCard()));
        const maxTopDownStackCard = Math.max(...topDownStacks.map(s => s.getTopCard()));

        const bottomUpStacksDead = maxHandCard < minBottomUpStackCard;
        const topDownStacksDead = minHandCard > maxTopDownStackCard;

        const bottomUpSavePossible = bottomUpStacks.map(s => s.getTopCard()).some(c => player.handCards.some(h => h === c - 10));
        const topDownSavePossible = topDownStacks.map(s => s.getTopCard()).some(c => player.handCards.some(h => h === c + 10));

        return bottomUpStacksDead && topDownStacksDead && !bottomUpSavePossible && !topDownSavePossible;
    }

    private isGameLostOnFire(): boolean{
        const classicGameOver = this.isGameLostClassic();
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

    get progress(): GameProgress{
        return this._progress;
    }
}
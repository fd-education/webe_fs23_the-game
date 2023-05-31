import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {StackDirection} from '@the-game/common/dist/enum/game/StackDirection';
import {GameState} from '@the-game/common/dist/types/game/GameState';
import {Player} from './player';
import {Stack} from './stack';
import { v4 as uuidv4 } from 'uuid';

export class Game{
    private _uid: string;
    private _creator: string;
    private _mode: GameMode;
    private _playerLimit: number;
    private _players: Player[];
    private stacks: Stack[];
    private _started = false;

    private pullStack: number[];
    private numberOfHandcards: number;

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
            pickupStack: this.pullStack.length,

            stack1: this.stacks[0].getTopCard(),
            stack2: this.stacks[1].getTopCard(),
            stack3: this.stacks[2].getTopCard(),
            stack4: this.stacks[3].getTopCard(),

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

        stack.addCard(card);
        player.removeCard(card);

        console.log(player.handCards);
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
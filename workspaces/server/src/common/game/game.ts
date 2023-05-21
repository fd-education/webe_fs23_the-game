import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {Player} from './player';
import { v4 as uuidv4 } from 'uuid';

export class Game{
    private _uid: string;
    private _creator: string;
    private _mode: GameMode;
    private _playerLimit: number;
    private _players: Player[];
    private stacks: Stack[];
    private started = false;

    private pullStack: number[];
    private numberOfHandcards: number;

    constructor(creator: string, gameMode: GameMode, playerLimit: number){
        this._uid = uuidv4();
        this._creator = creator;
        this._playerLimit = playerLimit;
        this._mode = gameMode;

        this._players = [];
    }

    public joinPlayer(player: Player){
        if(this._players.findIndex(p => p.uid === player.uid) !== -1) throw new Error('Player already in game');
        if(this.started) throw new Error('Game already started');
        if(this._players.length >= this._playerLimit) throw new Error('Game is full');

        this._players.push(player);
    }

    public startGame(){
        this.started = true;
        this.numberOfHandcards = this._players.length === 1 ? 8 : this._players.length === 2? 7 : 6;

        for(let i = 1; i <= 4; i++){
            this.stacks.push(new Stack(i));
        }

        this.pullStack = this.generateCards();
        this.dealCards();

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
}
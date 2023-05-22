import {Injectable} from '@nestjs/common';
import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {GameCreateResponseDto} from '@the-game/common/dist/types/game/GameCreateDto';
import {GameJoinDto} from '@the-game/common/dist/types/game/GameJoinDto';
import {Socket} from 'socket.io';
import {Game} from '../game/game';
import {Player} from '../game/player';

@Injectable()
export class GameManager{
    private openGames: Game[] = [];
    private runningGames: Game[] = [];

    private playersInGame: Map<string, string> = new Map<string, string>();

    constructor(){

    }

    public createGame(creator: string, mode: GameMode, maxPlayers: number): Game{
        const game = new Game(creator, mode, maxPlayers);
        this.openGames.push(game);

        return game;
    }

    public getOpenGames(): GameCreateResponseDto[]{
        const gamesToReturn = [];

        for(let game of this.openGames){
            gamesToReturn.push({
                uid: game.uid,
                creator: game.creator,
                mode: game.mode,
                numberOfPlayers: game.playerLimit,
                connectedPlayers: game.players.length
            });
        }

        return gamesToReturn;
    }

    public validateJoinRequest(gjd: GameJoinDto): void{
        const game = this.openGames.find(game => game.uid === gjd.gameUid);

        if(!game) throw new Error('Game not found');

        const gameUid = this.playersInGame.get(gjd.userUid);
        if(gameUid && gameUid != gjd.gameUid) throw new Error('Player already in another game');
    }

    public addPlayerToGame(gjd: GameJoinDto){
        const game = this.openGames.find(game => game.uid === gjd.gameUid);

        if(!game) throw new Error('Game not found');

        const gameUid = this.playersInGame.get(gjd.userUid);
        if(gameUid && gameUid != gjd.gameUid) throw new Error('Player already in another game');

        this.playersInGame.set(gjd.userUid, gjd.gameUid);
        return game.joinPlayer(new Player(gjd.userUid, gjd.userName));
    }

    public getPlayersFromGame(gameId: string): any[]{
        const game = this.openGames.find(game => game.uid === gameId);

        if(!game) throw new Error('Game not found');

        const players = [];

        for(let p of game.players){
            players.push({
                uid: p.uid,
                name: p.username,
                handCards: p.handCards
            });
        }

        return players;
    }

    public startGame(gameId: string){
        const gameToStart = this.openGames.find(game => game.uid === gameId);

        if(!gameToStart) throw new Error('Game not found');

        gameToStart.startGame();
        this.runningGames.push(gameToStart);

        return gameToStart.getGameState();
    }

    public getGameState(gameId: string){
        const game = this.runningGames.find(game => game.uid === gameId);

        if(!game) throw new Error('Game not found');

        return game.getGameState();
    }

    public isPlayerInRunningGame(playerId: string): string | undefined{
        const game =  this.runningGames.find(game => game.players.some(player => player.uid === playerId));

        if(!game) return '';

        return game.uid;
    }
}


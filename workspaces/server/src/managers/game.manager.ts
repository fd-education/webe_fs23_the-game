import {Injectable} from '@nestjs/common';
import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {GameCreateResponseDto} from '@the-game/common/dist/types/game/GameCreateDto';
import {GameJoinDto} from '@the-game/common/dist/types/game/GameJoinDto';
import {GameState} from '@the-game/common/dist/types/game/GameState';
import {GamesService} from '../data/games/games.service';
import {Game} from '../game/game';
import {Player} from '../game/player';

@Injectable()
export class GameManager{
    private openGames: Game[] = [];
    private runningGames: Game[] = [];

    private playersInGame: Map<string, string> = new Map<string, string>();

    constructor(private gamesService: GamesService){

    }

    public createGame(creator: string, mode: GameMode, maxPlayers: number): Game{
        const game = new Game(creator, mode, maxPlayers);
        this.openGames.push(game);

        return game;
    }

    public deleteGame(gameId: string): Game{
        const gameToDelete = this.openGames.find(game => game.uid === gameId);
        if(!gameToDelete) throw new Error('Game not found');

        for(const player of gameToDelete.players){
            this.removePlayerFromGame(player.uid);
        }

        this.openGames = this.openGames.filter(game => game.uid !== gameId);

        return gameToDelete;
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

    public removePlayerFromGame(playerId: string){
        const gameUid = this.playersInGame.get(playerId);
        if(!gameUid) throw new Error('Player not found');

        const game = this.openGames.find(game => game.uid === gameUid);
        if(!game) throw new Error('Game not found');

        this.playersInGame.delete(playerId);
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

        return gameToStart;
    }

    public getRunningGame(gameId: string){
        const game = this.runningGames.find(game => game.uid === gameId);

        if(!game) throw new Error('Game not found');

        return game;
    }

    public getAnyGame(gameId: string): Game{
        const games= this.openGames.concat(this.runningGames);

        const game = games.find(game => game.uid === gameId);
        if(!game) throw new Error('Game not found');

        return game;
    }

    public getGameState(gameId: string){
        const game = this.runningGames.find(game => game.uid === gameId);

        if(!game) throw new Error('Game not found');

        return game.getGameState();
    }

    public getGameStateByPlayer(playerId: string): GameState{
        const games = this.openGames.concat(this.runningGames);
        const game = games.find(game => game.players.some(player => player.uid === playerId));

        if(!game) throw new Error('Game not found');

        return game.getGameState();
    }

    public isPlayerInRunningGame(playerId: string): string | undefined{
        const games = this.openGames.concat(this.runningGames);
        const game =  games.find(game => game.players.some(player => player.uid === playerId));

        if(!game) return '';

        return game.uid;
    }
}


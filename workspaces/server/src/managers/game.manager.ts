import {Injectable} from '@nestjs/common';
import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {GameProgress} from '@the-game/common/dist/enum/game/gameProgress.enum';
import {GameCreateResponseDto} from '@the-game/common/dist/types/game/GameCreateDto';
import {GameJoinDto} from '@the-game/common/dist/types/game/GameJoinDto';
import {GameState} from '@the-game/common/dist/types/game/GameState';
import {GameSchema} from '../data/games/games.schema';
import {GamesService} from '../data/games/games.service';
import {Game} from '../game/game';
import {Player} from '../game/player';
import {Stack} from '../game/stack';

@Injectable()
export class GameManager{
    private openGames: Game[] = [];
    private runningGames: Game[] = [];

    private playersInGame: Map<string, string> = new Map<string, string>();

    constructor(private gamesService: GamesService){
        this.buildOpenGames();
        this.buildRunningGames();
    }

    public createGame(creator: string, mode: GameMode, maxPlayers: number): Game{
        if(this.openGames.concat(this.runningGames).some(g => g.creator === creator)) throw new Error('Player already created a game')
        if(this.playersInGame.get(creator)) throw new Error('Player already in another game');

        const game = new Game(creator, mode, maxPlayers);
        this.openGames.push(game);

        return game;
    }

    public deleteGame(gameId: string): Game{
        const gameToDelete = this.openGames.concat(this.runningGames).find(game => game.uid === gameId);
        if(!gameToDelete) throw new Error('Game not found');

        for(const player of gameToDelete.players){
            this.removePlayerFromGame(player.uid);
        }

        this.openGames = this.openGames.filter(game => game.uid !== gameId);
        this.runningGames = this.runningGames.filter(game => game.uid !== gameId);

        return gameToDelete;
    }

    public getAllGames(): GameCreateResponseDto[]{
        const gamesToReturn = [];

        for(const game of this.openGames.concat(this.runningGames)){
            gamesToReturn.push({
                uid: game.uid,
                creator: game.creator,
                mode: game.mode,
                numberOfPlayers: game.playerLimit,
                connectedPlayers: game.players.map(p => p.uid),
                started: game.progress !== GameProgress.OPEN
            });
        }

        return gamesToReturn;
    }

    public validateJoinRequest(gjd: GameJoinDto): void{
        const openGame = this.openGames.find(game => game.uid === gjd.gameUid);
        const runningGame = this.runningGames.find(g => g.uid === gjd.gameUid);

        if(!openGame && !runningGame) throw new Error('Game not found');

        const gameUid = this.playersInGame.get(gjd.userUid);
        if(gameUid && gameUid !== gjd.gameUid) throw new Error('Player already in another game');
    }

    public addPlayerToGame(gjd: GameJoinDto){
        const game = this.getAnyGame(gjd.gameUid);

        const gameUid = this.playersInGame.get(gjd.userUid);
        if(gameUid && gameUid != gjd.gameUid) throw new Error('Player already in another game');

        if(game.progress !== GameProgress.OPEN) return;

        this.playersInGame.set(gjd.userUid, gjd.gameUid);
        game.joinPlayer(new Player(gjd.userUid, gjd.userName));
    }

    public removePlayerFromGame(playerId: string){
        const gameUid = this.playersInGame.get(playerId);
        if(!gameUid) throw new Error('Player not found');

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
        this.openGames = this.openGames.filter(g => g.uid !== gameToStart.uid);

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

    private async buildOpenGames(){
        const persistedOpenGames = await this.gamesService.findOpenGames();
        const openGames = this.buildGames(persistedOpenGames);
        this.openGames = this.openGames.concat(openGames);
    }

    private async buildRunningGames(){
        const persistedRunningGames = await this.gamesService.findRunningGames();
        this.runningGames = this.runningGames.concat(this.buildGames(persistedRunningGames));
    }

    private buildGames(games: GameSchema[]): Game[]{
        if(!games || games.length === 0) return [];

        const gamesToReturn: Game[] = [];

        for(let game of games){
            const stacks = game.stacks.map(s => new Stack(s.id, s.direction, s.cards));
            const players = game.players.map(p => new Player(p.uid, p.username, p.handCards));

            gamesToReturn.push(new Game(
                game.creator,
                game.gameMode,
                game.numberOfPlayers,
                game.gameId,
                game.numberOfHandcards,
                game.progress,
                stacks,
                game.roundCounter,
                game.isNewRound,
                game.canRoundEnd,
                game.cardsLaidInRound,
                game.dangerRound,
                players
                )
            )
        }

        return gamesToReturn;
    }
}


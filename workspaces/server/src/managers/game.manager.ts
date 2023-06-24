import {Injectable} from '@nestjs/common';
import {GameMode} from '@the-game/common/dist/enum/game/gameMode.enum';
import {GameProgress} from '@the-game/common/dist/enum/game/gameProgress.enum';
import {Exceptions} from '@the-game/common/dist/enum/websockets/exceptions.enum';
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
        this.buildOpenGames().catch();
        this.buildRunningGames().catch();
    }

    public createGame(creator: string, mode: GameMode, maxPlayers: number): Game{
        if(this.openGames.concat(this.runningGames).some(g => g.creator === creator)) throw new Error(Exceptions.PLAYER_ALREADY_CREATOR);
        if(this.playersInGame.get(creator)) throw new Error(Exceptions.PLAYER_ALREADY_IN_GAME);

        const game = new Game(creator, mode, maxPlayers);
        this.openGames.push(game);

        return game;
    }

    public deleteGame(gameId: string, userId: string, force: boolean = false): Game{
        const gameToDelete = this.openGames.concat(this.runningGames).find(game => game.uid === gameId);
        if(!gameToDelete) throw new Error(Exceptions.GAME_NOT_FOUND);
        if(!force && gameToDelete.creator != userId) throw new Error(Exceptions.DELETER_NOT_CREATOR);

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

    public addPlayerToGame(gjd: GameJoinDto){
        const game = this.getAnyGame(gjd.gameUid);
        if(!game) throw new Error(Exceptions.GAME_NOT_FOUND);

        const gameUid = this.playersInGame.get(gjd.userUid);
        if(gameUid && gameUid != gjd.gameUid) throw new Error(Exceptions.PLAYER_ALREADY_IN_GAME);

        if(game.progress !== GameProgress.OPEN) return;

        this.playersInGame.set(gjd.userUid, gjd.gameUid);
        game.joinPlayer(new Player(gjd.userUid, gjd.userName));
    }

    public removePlayerFromGame(playerId: string){
        const gameUid = this.playersInGame.get(playerId);
        if(!gameUid) throw new Error('Player not found');

        this.playersInGame.delete(playerId);
    }

    public startGame(gameId: string){
        const gameToStart = this.openGames.find(game => game.uid === gameId);

        if(!gameToStart) throw new Error(Exceptions.GAME_NOT_FOUND);

        gameToStart.startGame();
        this.runningGames.push(gameToStart);
        this.openGames = this.openGames.filter(g => g.uid !== gameToStart.uid);

        return gameToStart;
    }

    public getRunningGame(gameId: string){
        const game = this.runningGames.find(game => game.uid === gameId);

        if(!game) throw new Error(Exceptions.GAME_NOT_STARTED);

        return game;
    }

    public getAnyGame(gameId: string): Game{
        const games= this.openGames.concat(this.runningGames);

        const game = games.find(game => game.uid === gameId);
        if(!game) throw new Error(Exceptions.GAME_NOT_FOUND);

        return game;
    }

    public getGameStateByPlayer(playerId: string): GameState{
        const games = this.openGames.concat(this.runningGames);
        const game = games.find(game => game.players.some(player => player.uid === playerId));

        if(!game) throw new Error(Exceptions.GAME_NOT_FOUND);

        return game.getGameState();
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
            const stacks = game.stacks.map(stack => {
                const s = JSON.parse(JSON.stringify(stack));
                return new Stack(s._id, s._direction, s._cards)
            });


            const players = game.players.map(player => {
                const p = JSON.parse(JSON.stringify(player));
                return new Player(p._uid, p._username, p._handCards);
            });

            for(let player of players){
                this.playersInGame.set(player.uid, game.gameId);
            }

            const gJson = JSON.parse(JSON.stringify(game));

            const g = new Game(
                gJson.creator,
                gJson.gameMode,
                gJson.numberOfPlayers,
                gJson.gameId,
                gJson.numberOfHandcards,
                gJson.progress,
                gJson.pickupStack,
                stacks,
                gJson.roundCounter,
                gJson.isNewRound,
                gJson.canRoundEnd,
                gJson.cardsLaidInRound,
                gJson.dangerRound,
                players
            )

            gamesToReturn.push(g)
        }

        return gamesToReturn;
    }
}


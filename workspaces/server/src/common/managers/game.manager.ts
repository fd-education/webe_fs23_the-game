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

    public addPlayerToGame(gjd: GameJoinDto){
        const game = this.openGames.find(game => game.uid === gjd.gameUid);

        if(!game) throw new Error('Game not found');

        const player = new Player(gjd.userUid, gjd.userName);
        game.joinPlayer(player);

        return player;
    }

    public startGame(gameId: string){
        const gameToStart = this.openGames.find(game => game.uid === gameId);

        if(!gameToStart) throw new Error('Game not found');

        gameToStart.startGame();
        this.runningGames.push(gameToStart);
    }
}


import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {CreateLobby} from '@the-game/common/dist/types/lobby/createLobby';
import {JoinLobby} from '@the-game/common/dist/types/lobby/joinLobby';
import {Lobby} from '@the-game/common/dist/types/lobby/lobby';
import {NewLobby} from '@the-game/common/dist/types/lobby/newLobby';
import {Model} from 'mongoose';
import {LoggerService} from '../../common/logger/logger.service';
import {BcryptService} from '../../security/bcrypt/bcrypt.service';
import {User} from '../users/user.schema';
import {Game} from './game.schema';

@Injectable()
export class GamesService{
    constructor(
        @InjectModel(Game.name) private gameModel: Model<Game>,
        private logger: LoggerService,
    ) {
        this.logger.setContext(GamesService.name);
    }

    async create(createGameDto: CreateLobby): Promise<NewLobby> {
        return await this.gameModel.create(createGameDto);
    }

    async join(joinGameDto: JoinLobby): Promise<Lobby> {
        const lobby = await this.gameModel.findOne({uid: joinGameDto.lobby_uid});

        if(!lobby) throw new Error('Lobby not found');
        if(lobby.players.length >= lobby.numberOfPlayers) throw new Error('Lobby is full');
        if(lobby.players.includes(joinGameDto.user_uid)) throw new Error('User already in lobby');

        lobby.players.push(joinGameDto.user_uid);

        const updatedLobby = await this.gameModel.findOneAndUpdate({uid: joinGameDto.lobby_uid}, lobby, {new: true})
        if(!updatedLobby) throw new Error('Lobby not found');

        return updatedLobby;
    }
}


import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {CreateLobby} from '@the-game/common/dist/types/lobby/createLobby';
import {JoinLobby} from '@the-game/common/dist/types/lobby/joinLobby';
import {Lobby} from '@the-game/common/dist/types/lobby/lobby';
import {NewLobby} from '@the-game/common/dist/types/lobby/newLobby';
import {Model} from 'mongoose';
import {LoggerService} from '../../common/logger/logger.service';
import {GameLobby} from './game-lobby.schema';

@Injectable()
export class GameLobbyService {
    constructor(
        @InjectModel(GameLobby.name) private gameLobbyModel: Model<GameLobby>,
        private logger: LoggerService,
    ) {
        this.logger.setContext(GameLobbyService.name);
    }

    async create(createLobbyDto: CreateLobby): Promise<NewLobby> {
        return await this.gameLobbyModel.create(createLobbyDto);
    }

    async findAll(): Promise<Lobby[]> {
        return await this.gameLobbyModel
            .find()
            .lean()
            .select(['-__v', '-_id']);
    }

    async join(joinLobby: JoinLobby): Promise<Lobby> {
        const lobby = await this.gameLobbyModel.findOne({uid: joinLobby.lobby_uid});

        if(!lobby) throw new Error('Lobby not found');
        if(lobby.players.length >= lobby.numberOfPlayers) throw new Error('Lobby is full');
        if(lobby.players.includes(joinLobby.user_uid)) throw new Error('User already in lobby');

        lobby.players.push(joinLobby.user_uid);

        const updatedLobby = await this.gameLobbyModel.findOneAndUpdate({uid: joinLobby.lobby_uid}, lobby, {new: true})
        if(!updatedLobby) throw new Error('Lobby not found');

        return updatedLobby;
    }
}


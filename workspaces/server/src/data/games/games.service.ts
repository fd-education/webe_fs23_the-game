import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {CreateLobby} from '@the-game/common/dist/types/lobby/createLobby';
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
}


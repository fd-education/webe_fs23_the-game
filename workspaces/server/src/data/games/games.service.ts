import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {LoggerService} from '../../common/logger/logger.service';
import {GameSchema} from './games.schema';

@Injectable()
export class GamesService {
    constructor(
        @InjectModel(GameSchema.name) private gamesModel: Model<GameSchema>,
        private logger: LoggerService,
    ) {
        this.logger.setContext(GamesService.name);
    }

    async create(createGame: GameSchema): Promise<GameSchema> {
        return await this.gamesModel.create(createGame);
    }

    async update(updateGame: GameSchema): Promise< GameSchema | null> {
        return await this.gamesModel.findOneAndUpdate({gameId: updateGame.gameId}, updateGame, {new: true});
    }
}


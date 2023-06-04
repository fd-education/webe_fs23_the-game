import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {IngameMessage} from '@the-game/common/dist/types/chat/message';
import {GameInterventionDto} from '@the-game/common/dist/types/game/GameInterventionDto';
import {Model} from 'mongoose';
import {Intervention} from './interventions.schema';

@Injectable()
export class InterventionsService {
    constructor(
        @InjectModel(Intervention.name) private interventionsModel: Model<Intervention>
    ) {}

    async create(intervention: GameInterventionDto): Promise<void> {
        await this.interventionsModel.create(intervention);
    }

    async findAllForGame(gameUid: string): Promise<Intervention[]> {
        return await this.interventionsModel
            .find({gameUid: gameUid})
            .limit(250)
            .sort({timestamp: -1})
            .lean()
            .select(['-__v', '-_id']);
    }
}
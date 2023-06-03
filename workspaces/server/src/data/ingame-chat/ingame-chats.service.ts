import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {IngameMessage} from '@the-game/common/dist/types/chat/message';
import {Model} from 'mongoose';
import {LoggerService} from '../../common/logger/logger.service';
import {IngameChat} from './ingame-chat.schema';

@Injectable()
export class IngameChatsService {
    constructor(
        @InjectModel(IngameChat.name) private ingameChatModel: Model<IngameChat>
    ) {}

    async create(chat: IngameMessage): Promise<void> {
        await this.ingameChatModel.create(chat);
    }

    async findAllForGame(gameUid: string): Promise<IngameChat[]> {
        return await this.ingameChatModel
            .find({gameUid: gameUid})
            .limit(250)
            .sort({timestamp: -1})
            .lean()
            .select(['-__v', '-_id']);
    }
}
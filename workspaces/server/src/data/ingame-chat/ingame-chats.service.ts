import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Message} from '@the-game/common/dist/types/chat/message';
import {Model} from 'mongoose';
import {LoggerService} from '../../common/logger/logger.service';
import {IngameChat} from './ingame-chat.schema';

@Injectable()
export class IngameChatsService {
    constructor(
        @InjectModel(IngameChat.name) private ingameChatModel: Model<IngameChat>,
        private logger: LoggerService,
    ) {}

    async create(chat: Message): Promise<void> {
        this.logger.debug(`Creating chat: ${JSON.stringify(chat)}`);
        await this.ingameChatModel.create(chat);
    }

    async findAll(): Promise<IngameChat[]> {
        this.logger.debug(`Finding all chats`);
        return await this.ingameChatModel
            .find({})
            .limit(250)
            .sort({timestamp: -1})
            .lean()
            .select(['-__v', '-_id']);
    }
}
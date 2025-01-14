import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Message} from '@the-game/common/dist/types/chat/message';
import {Model} from 'mongoose';
import {LoggerService} from '../../common/logger/logger.service';
import {Chat} from './chat.schema';

@Injectable()
export class ChatsService {
    constructor(
        @InjectModel(Chat.name) private chatModel: Model<Chat>,
        private logger: LoggerService,
    ) {}

    async create(chat: Message): Promise<void> {
        this.logger.debug(`Creating chat: ${JSON.stringify(chat)}`);
        await this.chatModel.create(chat);
    }

    async findAll(): Promise<Chat[]> {
        this.logger.debug(`Finding all chats`);
        return await this.chatModel
            .find({})
            .limit(250)
            .sort({timestamp: -1})
            .lean()
            .select(['-__v', '-_id']);
    }
}
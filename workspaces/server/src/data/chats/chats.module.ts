import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from '../../common/logger/logger.module';
import {Chat, ChatsSchema} from './chat.schema';
import {ChatsService} from './chats.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Chat.name, schema: ChatsSchema }]),
        LoggerModule,
    ],
    providers: [ChatsService],
    exports: [ChatsService],
})
export class ChatsModule {}
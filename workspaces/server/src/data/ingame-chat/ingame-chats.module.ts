import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from '../../common/logger/logger.module';
import {IngameChat, IngameChatsSchema} from './ingame-chat.schema';
import {IngameChatsService} from './ingame-chats.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: IngameChat.name, schema: IngameChatsSchema }]),
        LoggerModule,
    ],
    providers: [IngameChatsService],
    exports: [IngameChatsService],
})
export class IngameChatsModule{}
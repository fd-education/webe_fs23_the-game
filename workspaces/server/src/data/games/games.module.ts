import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from '../../common/logger/logger.module';
import {GameSchema, GamesSchema} from './games.schema';
import {GamesService} from './games.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: GameSchema.name, schema: GamesSchema }]),
        LoggerModule,
    ],
    providers: [GamesService],
    exports: [GamesService],
})
export class GamesModule {}

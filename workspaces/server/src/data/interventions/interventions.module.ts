import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from '../../common/logger/logger.module';
import {Intervention, InterventionsSchema} from './interventions.schema';
import {InterventionsService} from './interventions.service';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Intervention.name, schema: InterventionsSchema }]),
        LoggerModule,
    ],
    providers: [InterventionsService],
    exports: [InterventionsService],
})
export class InterventionsModule {}
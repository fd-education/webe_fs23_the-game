import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigService} from "../config/config.service";
import {ConfigModule} from "../config/config.module";
@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.mongoUri,
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {}


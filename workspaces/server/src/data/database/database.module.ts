import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigService} from "../../common/config/config.service";
import {ConfigModule} from "../../common/config/config.module";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.mongoUri,
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {}


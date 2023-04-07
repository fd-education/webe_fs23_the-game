import { Module } from '@nestjs/common';
import { WebsocketModule } from './websocket/websocket.module';
import { LoggerModule } from './common/logger/logger.module';
import {ConfigModule} from "./common/config/config.module";
import {DatabaseModule} from "./data/database/database.module";
import { ApiModule } from './api/api.module';
import {AuthModule} from "./api/auth/auth.module";
import {UsersModule} from "./data/users/users.module";
import { ProfileModule } from './api/profile/profile.module';
import { ProfileService } from './api/profile/profile.service';
import { ProfileController } from './api/profile/profile.controller';

@Module({
  imports: [
      ConfigModule,
      DatabaseModule,
      LoggerModule,
      WebsocketModule,
      ApiModule,
      AuthModule,
      UsersModule,
      ProfileModule
      ],
  providers: [ProfileService],
  controllers: [ProfileController]
})
export class AppModule {}

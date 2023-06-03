import { Module } from '@nestjs/common';
import {ChatsModule} from './data/chats/chats.module';
import {GamesModule} from './data/games/games.module';
import {OwnJwtModule} from './security/jwt/jwt.module';
import { WebsocketModule } from './websocket/websocket.module';
import { LoggerModule } from './common/logger/logger.module';
import { ConfigModule } from './common/config/config.module';
import { DatabaseModule } from './data/database/database.module';
import { ApiModule } from './api/api.module';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './data/users/users.module';
import { MailModule } from './common/mail/mail.module';
import { TokensModule } from "./data/tokens/tokens.module";
import { ProfileModule } from "./api/profile/profile.module";

@Module({
    imports: [
        ConfigModule,
        DatabaseModule,
        LoggerModule,
        WebsocketModule,
        ApiModule,
        AuthModule,
        ProfileModule,
        UsersModule,
        TokensModule,
        ChatsModule,
        GamesModule,
        MailModule,
        OwnJwtModule
    ],
})
export class AppModule {}

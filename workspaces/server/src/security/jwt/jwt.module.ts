import { Module } from '@nestjs/common';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule} from '../../common/config/config.module';
import {ConfigService} from '../../common/config/config.service';
import {UsersModule} from '../../data/users/users.module';
import {JwtVerifyService} from './jwt.service';

@Module({
    imports: [
        UsersModule, ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                secret: configService.jwtAccessSecret,
                signOptions: { expiresIn: configService.jwtAccessExpiry },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [JwtVerifyService]
})
export class OwnJwtModule {}

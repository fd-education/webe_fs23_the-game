import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { LoggerModule } from '../../common/logger/logger.module';
import { UsersModule } from '../../data/users/users.module';
import { BcryptModule } from '../../security/bcrypt/bcrypt.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../../common/config/config.module';

@Module({
  imports: [LoggerModule, UsersModule, BcryptModule, ConfigModule, JwtModule],
  providers: [ProfileService],
  controllers: [ProfileController],
})
export class ProfileModule {}

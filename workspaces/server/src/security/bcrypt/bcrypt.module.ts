import { Module } from '@nestjs/common';
import {LoggerModule} from '../../common/logger/logger.module';
import { BcryptService } from './bcrypt.service';
import { ConfigModule } from '../../common/config/config.module';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [BcryptService],
  exports: [BcryptService],
})
export class BcryptModule {}

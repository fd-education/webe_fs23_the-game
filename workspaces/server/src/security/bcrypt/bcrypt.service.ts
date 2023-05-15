import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../common/config/config.service';
import * as bcrypt from 'bcrypt';
import {LoggerService} from '../../common/logger/logger.service';

@Injectable()
export class BcryptService {
  constructor(private configService: ConfigService, private logger: LoggerService) {
    this.logger.setContext(BcryptService.name);
  }

  async hash(value: string): Promise<string> {
    this.logger.debug(`Hashing ${value}`);

    const saltRounds = this.configService.saltRounds;
    return await bcrypt.hash(value, saltRounds);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    this.logger.debug(`Comparing ${plain} to ${hash}`);

    return await bcrypt.compare(plain, hash);
  }
}

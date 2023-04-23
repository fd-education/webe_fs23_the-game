import { Injectable } from '@nestjs/common';
import { ConfigService } from '../../common/config/config.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  constructor(private configService: ConfigService) {}

  async hash(value: string): Promise<string> {
    const saltRounds = this.configService.saltRounds;
    return await bcrypt.hash(value, saltRounds);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plain, hash);
  }
}

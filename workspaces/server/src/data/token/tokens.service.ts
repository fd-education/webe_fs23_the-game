import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token } from './token.schema';
import { Model } from 'mongoose';
import { TokenDto } from '../../common/dto/token.dto';
import { LoggerService } from '../../common/logger/logger.service';

@Injectable()
export class TokensService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<Token>,
    private logger: LoggerService,
  ) {
    this.logger.setContext(TokensService.name);
  }

  async create(tokenDto: TokenDto): Promise<Token> {
    return await this.tokenModel.create(tokenDto);
  }

  async findToken(token: string): Promise<Token | null> {
    return await this.tokenModel
      .findOne({ token })
      .lean().select(['-__v', '-_id']);
  }

  async delete(token: string): Promise<Token | null> {
    return await this.tokenModel
      .findOneAndDelete({ token })
      .lean()
      .select(['-__v', '-_id']);
  }
}

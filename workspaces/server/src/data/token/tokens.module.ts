import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {Token, TokensSchema } from './token.schema';
import { TokensService } from './tokens.service';
import { LoggerModule } from '../../common/logger/logger.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokensSchema }]),
    LoggerModule,
  ],
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}

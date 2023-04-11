import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
  @Prop({
    unique: true,
    default: function genUUID() {
      return uuidv4();
    },
  })
  uid: string;

  @Prop({
    required: true,
    unique: true
  })
  username: string;

  @Prop({
    required: true,
    unique: true
  })
  token: string;

  @Prop({
    type: Date,
    expires: '1h',
    default: Date.now
  })
  createdAt: number
}

export const TokensSchema = SchemaFactory.createForClass(Token);

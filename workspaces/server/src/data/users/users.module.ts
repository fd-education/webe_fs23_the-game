import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from './user.schema';
import { UsersService } from './users.service';
import { BcryptModule } from '../../security/bcrypt/bcrypt.module';
import { LoggerModule } from '../../common/logger/logger.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }]),
    BcryptModule,
    LoggerModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

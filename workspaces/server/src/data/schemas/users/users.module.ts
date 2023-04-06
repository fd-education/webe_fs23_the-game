import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {User, UsersSchema} from "./user.schema";
import {UsersService} from "./users.service";

@Module({
    imports: [MongooseModule.forFeature([{name: User.name, schema: UsersSchema}])],
    providers: [UsersService]
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import {AuthService} from "./auth/auth.service";
import {UsersService} from "../data/users/users.service";

@Module({
    providers: [AuthModule],
    exports: [AuthModule]
})
export class ApiModule {}

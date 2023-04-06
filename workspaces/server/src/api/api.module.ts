import { Module } from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";

@Module({
    providers: [AuthModule],
    exports: [AuthModule]
})
export class ApiModule {}

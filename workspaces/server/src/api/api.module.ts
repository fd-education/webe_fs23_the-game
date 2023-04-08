import { Module } from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import { ProfileModule } from './profile/profile.module';

@Module({
    providers: [AuthModule],
    exports: [AuthModule],
    imports: [ProfileModule]
})
export class ApiModule {}

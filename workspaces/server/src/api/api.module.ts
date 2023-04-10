import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  providers: [AuthModule, ProfileModule],
  exports: [AuthModule, ProfileModule],
})
export class ApiModule {}

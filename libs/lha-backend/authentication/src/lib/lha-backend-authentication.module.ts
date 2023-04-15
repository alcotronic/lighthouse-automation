import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthenticationController } from './controller/authentication.controller';
import { AuthenticationService } from './service/authentication.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { LhaBackendUserModule } from '@lighthouse-automation/lha-backend/user';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule,
    LhaBackendUserModule
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, LocalStrategy],
  exports: [],
})
export class LhaBackendAuthenticationModule {}

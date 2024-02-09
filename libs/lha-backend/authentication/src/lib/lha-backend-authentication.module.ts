import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { LhaBackendUserModule } from '@lighthouse-automation/lha-backend/user';

import { AuthenticationController } from './controller/authentication.controller';
import { AuthenticationService } from './service/authentication.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_SIGN_OPTIONS_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
    LhaBackendUserModule
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, JwtStrategy, LocalStrategy],
  exports: [],
})
export class LhaBackendAuthenticationModule {}

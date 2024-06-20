import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  error(error) {
    console.log('JwtStrategy.error');
    console.log(error);
  }

  fail(error) {
    console.log('JwtStrategy.fail');
    console.log(error);
  }

  async validate(payload) {
    console.log('JwtStrategy.validate');
    console.log(payload);
    return { userId: payload.userId, username: payload.username };
  }
}

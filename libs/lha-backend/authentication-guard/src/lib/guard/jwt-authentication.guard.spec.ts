import { Reflector } from '@nestjs/core';
import { JwtAuthenticationGuard } from './jwt-authentication.guard';

describe('JwtAuthenticationGuard', () => {
  let guard: JwtAuthenticationGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new JwtAuthenticationGuard(reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});

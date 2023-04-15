import { Reflector } from '@nestjs/core';
import { LocalAuthenticationGuard } from './local-authentication.guard';

describe('LocalAuthenticationGuard', () => {
  let guard: LocalAuthenticationGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new LocalAuthenticationGuard(reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });
});

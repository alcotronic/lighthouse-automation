import { Controller, Logger, Post, UseGuards, Request } from '@nestjs/common';
import { AuthenticationService } from '../service/authentication.service';
import { Public } from '@lighthouse-automation/lha-backend/authentication-decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('authentication')
export class AuthenticationController {
  private readonly logger = new Logger(AuthenticationController.name);
  constructor(private authenticationService: AuthenticationService) {}

  @Public()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authenticationService.login(req.user);
  }
}

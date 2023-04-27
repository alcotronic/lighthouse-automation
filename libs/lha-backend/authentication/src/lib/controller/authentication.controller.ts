import { Controller, Logger, Post, UseGuards, Request, Get } from '@nestjs/common';
import { AuthenticationService } from '../service/authentication.service';
import { Public } from '@lighthouse-automation/lha-backend/authentication-decorator';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthenticationGuard } from '@lighthouse-automation/lha-backend/authentication-guard';
import { Role } from '@lighthouse-automation/lha-common';
import { Roles } from '@lighthouse-automation/lha-backend/role-decorator';

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

  @UseGuards(JwtAuthenticationGuard)
  @Roles(Role.User)
  @Get('logout')
  async logout(@Request() req) {
    this.logger.debug(req.user);
    return this.authenticationService.logout(req.user);
  }
}

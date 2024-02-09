import {
  Controller,
  Get,
  Header,
  Logger,
  UseGuards,
  Request
} from '@nestjs/common';

import { RoleService } from '../service/role.service';
import { JwtAuthenticationGuard } from '@lighthouse-automation/lha-backend/authentication-guard';
import { Roles } from '@lighthouse-automation/lha-backend/role-decorator';
import { Role } from '@lighthouse-automation/lha-common';

@Controller('role')
export class RoleController {
  private readonly logger = new Logger(RoleController.name);

  constructor(
    private roleService: RoleService
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Roles(Role.User)
  @Get('user')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  getCurrentUserRoles(@Request() req) {
    this.logger.debug(req.user);
    return this.roleService.getRolesForUser(req.user.userId);
  }
}

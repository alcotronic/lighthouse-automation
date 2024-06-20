import {
  Controller,
  Get,
  Header,
  Logger,
  UseGuards,
  Request
} from '@nestjs/common';

import { RoleService } from '../service/role.service';
import { JwtAuthenticationGuard } from '@lighthouse-automation/backend/authentication-guard';
import { Roles } from '@lighthouse-automation/backend/role-decorator';
import { Role } from '@lighthouse-automation/common';

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

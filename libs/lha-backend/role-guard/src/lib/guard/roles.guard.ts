import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '@lighthouse-automation/lha-backend/user';
import { Role } from '@lighthouse-automation/lha-backend/role';
import { ROLES_KEY } from '@lighthouse-automation/lha-backend/role-decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private userService: UserService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const result = await this.userService
      .findById(user.userId)
      .then((userFromDb) => {
        if (userFromDb) {
          return requiredRoles.some((role) => userFromDb.roles.includes(role));
        }
      });
    return result;
  }
}

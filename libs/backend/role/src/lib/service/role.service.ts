import { UserService } from '@lighthouse-automation/backend/user';
import { Role } from '@lighthouse-automation/common';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RoleService {
  private readonly logger = new Logger(RoleService.name);

  constructor(private userService: UserService) {}

  async getRolesForUser(userId: string): Promise<Role[]> {
    const user = await this.userService.findById(userId);
    this.logger.log(user);
    return user.roles;
  }
}

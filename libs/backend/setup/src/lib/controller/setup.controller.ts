import { Body, Controller, Logger, Post } from '@nestjs/common';
import { Public } from '@lighthouse-automation/backend/authentication-decorator';
import { Role } from '@lighthouse-automation/common';
import { UserCreateDto, UserService } from '@lighthouse-automation/backend/user';

@Controller('setup')
export class SetupController {
  private readonly logger = new Logger(SetupController.name);
  constructor(private userService: UserService) {}

  @Public()
  @Post()
  async setup(@Body() userCreateDto: UserCreateDto): Promise<any> {
    const userCount = await this.userService.count();
    if (userCount === 0) {
      const newUser = await this.userService.create({
        username: userCreateDto.username,
        password: userCreateDto.password,
        email: userCreateDto.email,
        roles: [Role.Admin, Role.User],
        activated: true,
      });
      if (newUser) {
        return { success: true };
      }
    } else {
      return { success: false };
    }
  }
}

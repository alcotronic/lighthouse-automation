import { Body, Controller, Get, Header, Post, Request, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from '@lighthouse-automation/lha-backend/authentication-guard';
import { Role } from '@lighthouse-automation/lha-common';
import { Roles } from '@lighthouse-automation/lha-backend/role-decorator';
import { UserCreateDto } from '../schema/user';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Roles(Role.Admin)
  @Get('admin')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  async admin() {
    return { isAdmin: true };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Roles(Role.User)
  @Get('account')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  async account(@Request() req: any) {
    const user = await this.userService.findById(req.user.userId);
    return { username: user.username, email: user.email };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Roles(Role.Admin)
  @Get('list')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  async list() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthenticationGuard)
  @Roles(Role.Admin)
  @Post('create')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  async create(@Body() userCreateDto: UserCreateDto) {
    const existingUserName = await this.userService.findByUsername(userCreateDto.username);
    const existingUserEmail = await this.userService.findByEmail(userCreateDto.email);
    if (!!existingUserName || !!existingUserEmail) {
      return { created: false };
    }
    const user = this.userService.create({
      username: userCreateDto.username,
      email: userCreateDto.email,
      password: userCreateDto.password,
      roles: userCreateDto.roles,
      activated: userCreateDto.activated,
    });
    if (user) {
      return { created: true };
    }
    return { created: false };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Roles(Role.User)
  @Post('change/password')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  async changePassword(@Request() req: any, @Body() changePasswordDto: any) {
    const user = await this.userService.findById(req.user.userId);
    if (!user) {
      return { changed: false };
    }
    const userUpdated = this.userService.updatePassword(user._id, changePasswordDto.password);
    if (userUpdated) {
      return { changed: true };
    }
    return { changed: false };
  }
}

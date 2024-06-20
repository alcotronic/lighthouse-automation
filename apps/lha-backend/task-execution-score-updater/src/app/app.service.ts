import { UserService } from "@lighthouse-automation/lha-backend/user";
import { StatusDto } from "@lighthouse-automation/lha-common";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  constructor(private userService: UserService) {}

  async getAppStatus(): Promise<StatusDto> {
    const count = await this.userService.count();
    return {
      version: '0.1',
      initiated: count > 0 ? true : false,
    };
  }
}

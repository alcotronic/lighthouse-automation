import { UserService } from "@lighthouse-automation/lha-backend/user";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  constructor(private userService: UserService) {}

  async getAppStatus() {
    const count = await this.userService.count();
    const status = {
      version: '0.1',
      initiated: count > 0 ? true : false,
    };
    return status;
  }
}

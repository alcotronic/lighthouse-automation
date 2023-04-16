import { Controller, Get } from "@nestjs/common";

import { AppService } from "./app.service";
import { Public } from "@lighthouse-automation/lha-backend/authentication-decorator";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('status')
  getStatus(): any {
    const status = this.appService.getAppStatus();
    return status;
  }
}

import { Controller, Get } from "@nestjs/common";

import { AppService } from "./app.service";
import { Public } from "@lighthouse-automation/backend/authentication-decorator";
import { StatusDto } from "@lighthouse-automation/common";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('status')
  async getStatus(): Promise<StatusDto> {
    return this.appService.getAppStatus();
  }
}

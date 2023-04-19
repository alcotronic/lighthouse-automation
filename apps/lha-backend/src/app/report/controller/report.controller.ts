import { Controller, Get, UseGuards } from '@nestjs/common';
import { Header } from '@nestjs/common/decorators/http/header.decorator';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { JwtAuthenticationGuard } from '@lighthouse-automation/lha-backend/authentication-guard';
import { Role } from '@lighthouse-automation/lha-common';
import { Roles } from '@lighthouse-automation/lha-backend/role-decorator';
import { ReportService } from '../service/report.service';

@Controller('report')
export class ReportController {
  constructor(private reportService: ReportService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Roles(Role.User)
  @Get('by-TaskId:reportTaskId')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  getByTaskId(@Param() params) {
    return this.reportService.findByTaskId(params.reportTaskId);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Roles(Role.User)
  @Get('byTaskExecutionId/:reportTaskRunId')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  getByExecutionId(@Param() params) {
    return this.reportService.findByTaskExecutionId(params.taskExecutionId);
  }
}

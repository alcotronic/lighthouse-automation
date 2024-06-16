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
  @Get('byTaskId:reportTaskId')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  getByTaskId(@Param() params) {
    return this.reportService.findByTaskId(params.reportTaskId);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Roles(Role.User)
  @Get('byTaskExecutionId/:taskExecutionId')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  getByExecutionId(@Param() params) {
    return this.reportService.findByTaskExecutionId(params.taskExecutionId);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Roles(Role.User)
  @Get('html/:reportId')
  @Header('Content-Type', 'text/html')
  async postConvertToHtml(@Param() params) {
    const report = await this.reportService.findById(params.reportId);
    return this.reportService.unzipHtml(report);
  }

  // @UseGuards(JwtAuthenticationGuard)
  // @Roles(Role.User)
  // @Get('json/:reportId')
  // @Header('Accept', 'application/json')
  // @Header('Content-Type', 'application/json')
  // async postConvertToJson(@Param() params) {
  //   const report = await this.reportService.findById(params.reportId);
  //   return this.reportService.unzipJson(report);
  // }

  // @UseGuards(JwtAuthenticationGuard)
  // @Roles(Role.User)
  // @Get('csv/:reportId')
  // @Header('Accept', 'application/csv')
  // @Header('Content-Type', 'application/csv')
  // async postConvertToCsv(@Param() params) {
  //   const report = await this.reportService.findById(params.reportId);
  //   return this.reportService.unzipCsv(report);
  // }
}

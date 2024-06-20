import { Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common';
import { Header } from '@nestjs/common/decorators/http/header.decorator';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { JwtAuthenticationGuard } from '@lighthouse-automation/lha-backend/authentication-guard';
import { Role } from '@lighthouse-automation/lha-common';
import { Roles } from '@lighthouse-automation/lha-backend/role-decorator';
import { TaskExecutionService } from '../service/task-execution.service';
import { TaskExecutionInterceptor, TaskExecutionsInterceptor } from '../interceptor/task-execution.interceptor';

@Controller('task-execution')
export class TaskExecutionController {
  constructor(private taskExecutionService: TaskExecutionService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Roles(Role.User)
  @UseInterceptors(new TaskExecutionInterceptor())
  @Get('id/:taskExecutionId')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  getByExecutionId(@Param() params) {
    return this.taskExecutionService.findById(params.taskExecutionId);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Roles(Role.User)
  @UseInterceptors(new TaskExecutionsInterceptor())
  @Get('taskId/:taskId')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  getByTaskId(@Param() params) {
    return this.taskExecutionService.findByTaskId(params.taskId);
  }
}

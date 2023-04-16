import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthenticationGuard } from '@lighthouse-automation/lha-backend/authentication-guard';
import {
  Role,
  TaskCreateDto,
  TaskType,
} from '@lighthouse-automation/lha-common';
import { Roles } from '@lighthouse-automation/lha-backend/role-decorator';
import { Task } from '../schema/task';
import { TaskService } from '../service/task.service';
import { TaskSchedulerService } from '../service/task-scheduler.service';

@Controller('task')
export class TaskController {
  constructor(
    private taskService: TaskService,
    private taskSchedulerService: TaskSchedulerService
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Roles(Role.User)
  @Post('create')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  async create(
    @Body() taskCreateDto: TaskCreateDto,
    @Request() request: any
  ): Promise<Task> {
    const task = await this.taskService.create(
      request.user.userId,
      taskCreateDto
    );
    if (task.taskType === TaskType.MANUAL_REPORT) {
      console.info('Running manual task.');
      await this.taskSchedulerService.createExecutionsForTask(task);
      console.info('Finished manual task.');
    }
    return task;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Roles(Role.User)
  @Get('tasks')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  async getTasks(@Request() request: any): Promise<Task[]> {
    return this.taskService.findAll(request.user.userId);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Roles(Role.User)
  @Get('task/:taskId')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  async getTask(@Param() params, @Request() request: any): Promise<Task> {
    return this.taskService.findById(request.user.userId, params.taskId);
  }
}

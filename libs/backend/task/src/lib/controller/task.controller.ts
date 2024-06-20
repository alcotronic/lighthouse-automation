import {
  Body,
  Controller,
  Get,
  Header,
  Logger,
  Param,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthenticationGuard } from '@lighthouse-automation/backend/authentication-guard';
import {
  Role,
  TaskCreateDto,
  TaskType,
} from '@lighthouse-automation/common';
import { Roles } from '@lighthouse-automation/backend/role-decorator';
import { Task } from '../schema/task';
import { TaskService } from '../service/task.service';
import { TaskInterceptor, TasksInterceptor } from '../interceptor/task.interceptor';

@Controller('task')
export class TaskController {
  private readonly logger = new Logger(TaskController.name);

  constructor(
    private taskService: TaskService,
    private taskSchedulerService: TaskSchedulerService
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Roles(Role.User)
  @UseInterceptors(new TaskInterceptor())
  @Post('create')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  async create(
    @Body() taskCreateDto: TaskCreateDto,
    @Request() request
  ): Promise<Task> {
    const task = await this.taskService.create(
      request.user.userId,
      taskCreateDto
    );
    if (task.taskType === TaskType.MANUAL_REPORT) {
      this.logger.log('Running manual task.');
      await this.taskSchedulerService.createExecutionsForTask(task);
      this.logger.log('Finished manual task.');
    }
    return task;
  }

  @UseGuards(JwtAuthenticationGuard)
  @Roles(Role.User)
  @UseInterceptors(new TaskInterceptor())
  @Get('id/:taskId')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  async getTask(@Param() params, @Request() request): Promise<Task> {
    return this.taskService.findById(request.user.userId, params.taskId);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Roles(Role.User)
  @UseInterceptors(new TasksInterceptor())
  @Get('tasks')
  @Header('Accept', 'application/json')
  @Header('Content-Type', 'application/json')
  async getTasks(@Request() request): Promise<Task[]> {
    return this.taskService.findAll(request.user.userId);
  }

}

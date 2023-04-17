import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from '../schema/task';
import { TaskCreateDto, TaskInterval } from '@lighthouse-automation/lha-common';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('task')
    private taskModel: Model<TaskDocument>
  ) {}

  create(userId: string, taskCreateDto: TaskCreateDto) {
    const createdTask = new this.taskModel({
      userId: userId,
      name: taskCreateDto.name,
      taskType: taskCreateDto.taskType,
      taskInterval: taskCreateDto.taskInterval,
      enabled: taskCreateDto.enabled,
      urlList: taskCreateDto.urlList,
    });
    return createdTask.save();
  }

  findById(userId: string, id: string): Promise<Task> {
    return this.taskModel
      .findOne(
        { _id: id, userId: userId },
        'name reportType reportInterval enabled urlList countDesktop performanceScoreDesktop accessibilityScoreDesktop bestPracticeScoreDesktop seoScoreDesktop pwaScoreDesktop countMobile performanceScoreMobile accessibilityScoreMobile bestPracticeScoreMobile seoScoreMobile pwaScoreMobile',
      )
      .exec();
  }

  findByTaskInterval(taskInterval: TaskInterval): Promise<Task[]> {
    return this.taskModel
      .find({
        taskInterval: taskInterval,
      })
      .exec();
  }

  findByTaskIntervalAndEnabled(taskInterval: TaskInterval): Promise<Task[]> {
    return this.taskModel
      .find({
        taskInterval: taskInterval,
        enabled: true,
      })
      .exec();
  }

  findAll(userId: string): Promise<Task[]> {
    return this.taskModel
      .find(
        { userId: userId },
        'name reportType reportInterval enabled countDesktop performanceScoreDesktop accessibilityScoreDesktop bestPracticeScoreDesktop seoScoreDesktop pwaScoreDesktop countMobile performanceScoreMobile accessibilityScoreMobile bestPracticeScoreMobile seoScoreMobile pwaScoreMobile',
      )
      .exec();
  }
}

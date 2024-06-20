import { Device } from '../enum/device.enum';
import { TaskInterval } from '../enum/task-interval.enum';
import { TaskType } from '../enum/task-type.enum';
import { TaskDto } from './task.dto';

describe('TaskDto', () => {
  let taskDto: TaskDto;

  const testName = "testName";
  const testTaskType = TaskType.MANUAL_REPORT;
  const testTaskInterval = TaskInterval.NEVER;
  const testEnabled = true;
  const testUrlList = [ "http://testurl1.test", "http://testurl2.test" ];

  beforeEach(async () => {
    taskDto = {
      name: testName,
      taskType: testTaskType,
      taskInterval: testTaskInterval,
      enabled: testEnabled,
      urlList: testUrlList
    };
  });

  it('taskDta should be defined', () => {
    expect(taskDto).toBeDefined();
  });

  it('taskDta.name should be same as testName', () => {
    expect(taskDto.name).toBe(testName);
  });

  it('taskDta.taskType should be same as testTaskType', () => {
    expect(taskDto.taskType).toBe(testTaskType);
  });

  it('taskDta.taskInterval should be same as testTaskInterval', () => {
    expect(taskDto.taskInterval).toBe(testTaskInterval);
  });

  it('taskDta.enabled should be same as testEnabled', () => {
    expect(taskDto.enabled).toBe(testEnabled);
  });

  it('taskDta.urlList should be same as testUrlList', () => {
    expect(taskDto.urlList).toBe(testUrlList);
  });
});

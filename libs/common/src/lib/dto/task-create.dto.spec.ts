import { Device } from '../enum/device.enum';
import { TaskInterval } from '../enum/task-interval.enum';
import { TaskType } from '../enum/task-type.enum';
import { TaskCreateDto } from './task-create.dto';

describe('TaskCreateDto', () => {
  let taskCreateDta: TaskCreateDto;

  const testName = "testName";
  const testTaskType = TaskType.MANUAL_REPORT;
  const testTaskInterval = TaskInterval.NEVER;
  const testEnabled = true;
  const testUrlList = [ "http://testurl1.test", "http://testurl2.test" ];

  beforeEach(async () => {
    taskCreateDta = {
      name: testName,
      taskType: testTaskType,
      taskInterval: testTaskInterval,
      enabled: testEnabled,
      urlList: testUrlList
    };
  });

  it('taskCreateDta should be defined', () => {
    expect(taskCreateDta).toBeDefined();
  });

  it('taskCreateDta.name should be same as testName', () => {
    expect(taskCreateDta.name).toBe(testName);
  });

  it('taskCreateDta.taskType should be same as testTaskType', () => {
    expect(taskCreateDta.taskType).toBe(testTaskType);
  });

  it('taskCreateDta.taskInterval should be same as testTaskInterval', () => {
    expect(taskCreateDta.taskInterval).toBe(testTaskInterval);
  });

  it('taskCreateDta.enabled should be same as testEnabled', () => {
    expect(taskCreateDta.enabled).toBe(testEnabled);
  });

  it('taskCreateDta.urlList should be same as testUrlList', () => {
    expect(taskCreateDta.urlList).toBe(testUrlList);
  });
});

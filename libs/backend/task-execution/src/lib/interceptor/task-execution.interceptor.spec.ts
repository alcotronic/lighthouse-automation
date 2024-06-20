import { TaskExecutionInterceptor, TaskExecutionsInterceptor } from './task-execution.interceptor';

describe('TaskExecutionInterceptor', () => {
  it('should be defined', () => {
    expect(new TaskExecutionInterceptor()).toBeDefined();
  });
});
describe('TaskExecutionsInterceptor', () => {
  it('should be defined', () => {
    expect(new TaskExecutionsInterceptor()).toBeDefined();
  });
});

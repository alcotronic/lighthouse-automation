import { ReportDto } from './report.dto';
import { Device } from '../enum/device.enum';

describe('ReportDto', () => {
  let reportDto: ReportDto;

  const testTaskId = "1";
  const testTaskExecutionId = "2";
  const testFormFactor = Device.DESKTOP;
  const testUrl = "http://testurl.test";

  beforeEach(async () => {
    reportDto = {
      taskId: testTaskId,
      taskExecutionId: testTaskExecutionId,
      formFactor: testFormFactor,
      url: testUrl
    };
  });

  it('reportDto should be defined', () => {
    expect(reportDto).toBeDefined();
  });

  it('reportDto.taskId should be same as testTaskId', () => {
    expect(reportDto.taskId).toBe(testTaskId);
  });

  it('reportDto.taskExecutionId should be same as testTaskExecutionId', () => {
    expect(reportDto.taskExecutionId).toBe(testTaskExecutionId);
  });

  it('reportDto.frmFactor should be same as testFormFactor', () => {
    expect(reportDto.formFactor).toBe(testFormFactor);
  });

  it('reportDto.url should be same as testUrl', () => {
    expect(reportDto.url).toBe(testUrl);
  });
});

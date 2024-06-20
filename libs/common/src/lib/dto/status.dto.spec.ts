import { StatusDto } from './status.dto';

describe('ReportDto', () => {
  let statusDto: StatusDto;

  const testInitiated = true;

  beforeEach(async () => {
    statusDto = {
      initiated: testInitiated
    };
  });

  it('statusDto should be defined', () => {
    expect(statusDto).toBeDefined();
  });

  it('statusDto.taskId should be same as testInitiated', () => {
    expect(statusDto.initiated).toBe(testInitiated);
  });
});

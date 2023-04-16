/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReportTaskRunService } from './report-task-run.service';

describe('Service: ReportTaskRun', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportTaskRunService]
    });
  });

  it('should ...', inject([ReportTaskRunService], (service: ReportTaskRunService) => {
    expect(service).toBeTruthy();
  }));
});

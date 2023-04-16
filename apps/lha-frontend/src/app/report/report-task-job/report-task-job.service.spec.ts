/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReportTaskJobService } from './report-task-job.service';

describe('Service: ReportTaskJob', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportTaskJobService]
    });
  });

  it('should ...', inject([ReportTaskJobService], (service: ReportTaskJobService) => {
    expect(service).toBeTruthy();
  }));
});

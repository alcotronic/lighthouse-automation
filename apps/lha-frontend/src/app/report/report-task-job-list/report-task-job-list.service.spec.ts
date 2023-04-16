/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReportTaskJobListService } from './report-task-job-list.service';

describe('Service: ReportTaskJobList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportTaskJobListService]
    });
  });

  it('should ...', inject([ReportTaskJobListService], (service: ReportTaskJobListService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReportTaskService } from './report-task.service';

describe('Service: ReportTask', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportTaskService]
    });
  });

  it('should ...', inject([ReportTaskService], (service: ReportTaskService) => {
    expect(service).toBeTruthy();
  }));
});

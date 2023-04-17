/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReportTaskRunListService } from './report-task-run-list.service';

describe('Service: ReportTaskRunList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportTaskRunListService]
    });
  });

  it('should ...', inject([ReportTaskRunListService], (service: ReportTaskRunListService) => {
    expect(service).toBeTruthy();
  }));
});

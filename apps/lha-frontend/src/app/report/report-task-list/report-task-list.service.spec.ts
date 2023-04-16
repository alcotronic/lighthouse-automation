/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReportTaskListService } from './report-task-list.service';

describe('Service: ReportTaskList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportTaskListService]
    });
  });

  it('should ...', inject([ReportTaskListService], (service: ReportTaskListService) => {
    expect(service).toBeTruthy();
  }));
});

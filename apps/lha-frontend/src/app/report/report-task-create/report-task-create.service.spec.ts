/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReportTaskCreateService } from './report-task-create.service';

describe('Service: ReportTaskCreate', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportTaskCreateService]
    });
  });

  it('should ...', inject([ReportTaskCreateService], (service: ReportTaskCreateService) => {
    expect(service).toBeTruthy();
  }));
});

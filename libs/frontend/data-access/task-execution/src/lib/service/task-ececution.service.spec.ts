import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { TaskExecutionService } from './task-ececution.service';

describe('TaskExecutionService', () => {
  let service: TaskExecutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TaskExecutionService],
    });
    service = TestBed.inject(TaskExecutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

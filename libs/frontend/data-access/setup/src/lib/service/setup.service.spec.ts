import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { SetupService } from './setup.service';

describe('SetupService', () => {
  let service: SetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SetupService],
    });
    service = TestBed.inject(SetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

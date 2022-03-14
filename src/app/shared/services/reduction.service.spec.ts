import { TestBed } from '@angular/core/testing';

import { ReductionService } from './reduction.service';

describe('ReductionService', () => {
  let service: ReductionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReductionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

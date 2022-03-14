import { TestBed } from '@angular/core/testing';

import { TypePointService } from './type-point.service';

describe('TypePointService', () => {
  let service: TypePointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypePointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CadeauService } from './cadeau.service';

describe('CadeauService', () => {
  let service: CadeauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadeauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

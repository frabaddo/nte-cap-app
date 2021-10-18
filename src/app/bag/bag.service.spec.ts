import { TestBed } from '@angular/core/testing';

import { BagService } from './bag.service';

describe('BagService', () => {
  let service: BagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

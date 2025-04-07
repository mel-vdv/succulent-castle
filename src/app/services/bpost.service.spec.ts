import { TestBed } from '@angular/core/testing';

import { BpostService } from './bpost.service';

describe('BpostService', () => {
  let service: BpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

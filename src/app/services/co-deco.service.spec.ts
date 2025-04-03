import { TestBed } from '@angular/core/testing';

import { CoDecoService } from './co-deco.service';

describe('CoDecoService', () => {
  let service: CoDecoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoDecoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

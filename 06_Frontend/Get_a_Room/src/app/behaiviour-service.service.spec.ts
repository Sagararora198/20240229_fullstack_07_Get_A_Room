import { TestBed } from '@angular/core/testing';

import { BehaiviourServiceService } from './behaiviour-service.service';

describe('BehaiviourServiceService', () => {
  let service: BehaiviourServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BehaiviourServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

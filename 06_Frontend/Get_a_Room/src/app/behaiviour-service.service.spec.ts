import { TestBed } from '@angular/core/testing';

import { AuthService } from './behaiviour-service.service';
describe('BehaiviourServiceService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

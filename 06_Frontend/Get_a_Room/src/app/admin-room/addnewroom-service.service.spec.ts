import { TestBed } from '@angular/core/testing';

import { AddnewroomServiceService } from './addnewroom-service.service';

describe('AddnewroomServiceService', () => {
  let service: AddnewroomServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddnewroomServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

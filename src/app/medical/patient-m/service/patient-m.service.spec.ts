import { TestBed } from '@angular/core/testing';

import { PatientMService } from './patient-m.service';

describe('PatientMService', () => {
  let service: PatientMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

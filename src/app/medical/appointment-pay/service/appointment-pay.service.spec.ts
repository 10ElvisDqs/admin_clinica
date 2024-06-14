import { TestBed } from '@angular/core/testing';

import { AppointmentPayService } from './appointment-pay.service';

describe('AppointmentPayService', () => {
  let service: AppointmentPayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentPayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CalendarAppointmentService } from './calendar-appointment.service';

describe('CalendarAppointmentService', () => {
  let service: CalendarAppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarAppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

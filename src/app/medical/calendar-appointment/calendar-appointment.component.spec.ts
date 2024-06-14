import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarAppointmentComponent } from './calendar-appointment.component';

describe('CalendarAppointmentComponent', () => {
  let component: CalendarAppointmentComponent;
  let fixture: ComponentFixture<CalendarAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarAppointmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

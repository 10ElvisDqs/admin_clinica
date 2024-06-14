import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAppointmentPayComponent } from './list-appointment-pay.component';

describe('ListAppointmentPayComponent', () => {
  let component: ListAppointmentPayComponent;
  let fixture: ComponentFixture<ListAppointmentPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAppointmentPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAppointmentPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

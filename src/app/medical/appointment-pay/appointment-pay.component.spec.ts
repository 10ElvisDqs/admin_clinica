import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentPayComponent } from './appointment-pay.component';

describe('AppointmentPayComponent', () => {
  let component: AppointmentPayComponent;
  let fixture: ComponentFixture<AppointmentPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentPayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

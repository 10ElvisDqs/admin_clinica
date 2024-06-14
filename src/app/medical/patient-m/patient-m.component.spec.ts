import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMComponent } from './patient-m.component';

describe('PatientMComponent', () => {
  let component: PatientMComponent;
  let fixture: ComponentFixture<PatientMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

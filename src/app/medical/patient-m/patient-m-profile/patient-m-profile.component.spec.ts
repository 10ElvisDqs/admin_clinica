import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMProfileComponent } from './patient-m-profile.component';

describe('PatientMProfileComponent', () => {
  let component: PatientMProfileComponent;
  let fixture: ComponentFixture<PatientMProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

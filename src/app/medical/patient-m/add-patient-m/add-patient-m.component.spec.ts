import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientMComponent } from './add-patient-m.component';

describe('AddPatientMComponent', () => {
  let component: AddPatientMComponent;
  let fixture: ComponentFixture<AddPatientMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPatientMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPatientMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

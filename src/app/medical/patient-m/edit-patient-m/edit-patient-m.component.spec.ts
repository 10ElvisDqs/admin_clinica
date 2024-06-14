import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientMComponent } from './edit-patient-m.component';

describe('EditPatientMComponent', () => {
  let component: EditPatientMComponent;
  let fixture: ComponentFixture<EditPatientMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatientMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPatientMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

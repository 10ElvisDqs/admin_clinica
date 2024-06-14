import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMProfileComponent } from './doctor-m-profile.component';

describe('DoctorMProfileComponent', () => {
  let component: DoctorMProfileComponent;
  let fixture: ComponentFixture<DoctorMProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorMProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorMProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

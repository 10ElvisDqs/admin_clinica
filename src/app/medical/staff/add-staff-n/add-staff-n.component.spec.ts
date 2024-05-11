import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffNComponent } from './add-staff-n.component';

describe('AddStaffNComponent', () => {
  let component: AddStaffNComponent;
  let fixture: ComponentFixture<AddStaffNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStaffNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStaffNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

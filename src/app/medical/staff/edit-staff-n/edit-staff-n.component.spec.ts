import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStaffNComponent } from './edit-staff-n.component';

describe('EditStaffNComponent', () => {
  let component: EditStaffNComponent;
  let fixture: ComponentFixture<EditStaffNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditStaffNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStaffNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

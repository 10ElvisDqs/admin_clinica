import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStaffNComponent } from './list-staff-n.component';

describe('ListStaffNComponent', () => {
  let component: ListStaffNComponent;
  let fixture: ComponentFixture<ListStaffNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListStaffNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStaffNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

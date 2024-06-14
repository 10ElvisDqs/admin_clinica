import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPatientMComponent } from './list-patient-m.component';

describe('ListPatientMComponent', () => {
  let component: ListPatientMComponent;
  let fixture: ComponentFixture<ListPatientMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPatientMComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPatientMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

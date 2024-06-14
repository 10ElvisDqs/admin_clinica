import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionMedicalComponent } from './atencion-medical.component';

describe('AtencionMedicalComponent', () => {
  let component: AtencionMedicalComponent;
  let fixture: ComponentFixture<AtencionMedicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtencionMedicalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtencionMedicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

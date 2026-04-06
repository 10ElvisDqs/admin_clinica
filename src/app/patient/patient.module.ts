import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientRoutingModule } from './patient-routing.module';
import { PatientShellComponent } from './patient-shell/patient-shell.component';

@NgModule({
  declarations: [PatientShellComponent],
  imports: [CommonModule, RouterModule, PatientRoutingModule],
})
export class PatientModule {}

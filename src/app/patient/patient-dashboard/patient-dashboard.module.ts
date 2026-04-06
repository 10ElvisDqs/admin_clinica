import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PatientDashboardComponent } from './patient-dashboard.component';

const routes: Routes = [{ path: '', component: PatientDashboardComponent }];

@NgModule({
  declarations: [PatientDashboardComponent],
  imports: [CommonModule, RouterModule.forChild(routes), RouterModule],
})
export class PatientDashboardModule {}

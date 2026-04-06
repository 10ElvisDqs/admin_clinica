import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PatientLoginComponent } from './patient-login.component';

const routes: Routes = [{ path: '', component: PatientLoginComponent }];

@NgModule({
  declarations: [PatientLoginComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class PatientLoginModule {}

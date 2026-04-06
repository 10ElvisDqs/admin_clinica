import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PatientRegisterComponent } from './patient-register.component';

const routes: Routes = [{ path: '', component: PatientRegisterComponent }];

@NgModule({
  declarations: [PatientRegisterComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class PatientRegisterModule {}

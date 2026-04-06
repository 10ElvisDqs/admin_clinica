import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PatientPaymentMethodsComponent } from './patient-payment-methods.component';

const routes: Routes = [{ path: '', component: PatientPaymentMethodsComponent }];

@NgModule({
  declarations: [PatientPaymentMethodsComponent],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule.forChild(routes), RouterModule],
})
export class PatientPaymentMethodsModule {}

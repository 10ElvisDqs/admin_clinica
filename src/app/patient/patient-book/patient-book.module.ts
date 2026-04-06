import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PatientBookComponent } from './patient-book.component';

const routes: Routes = [{ path: '', component: PatientBookComponent }];

@NgModule({
  declarations: [PatientBookComponent],
  imports: [CommonModule, RouterModule.forChild(routes), RouterModule],
})
export class PatientBookModule {}

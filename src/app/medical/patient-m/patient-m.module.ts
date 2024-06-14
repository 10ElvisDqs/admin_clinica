import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientMRoutingModule } from './patient-m-routing.module';
import { PatientMComponent } from './patient-m.component';
import { AddPatientMComponent } from './add-patient-m/add-patient-m.component';
import { EditPatientMComponent } from './edit-patient-m/edit-patient-m.component';
import { ListPatientMComponent } from './list-patient-m/list-patient-m.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PatientMProfileComponent } from './patient-m-profile/patient-m-profile.component';


@NgModule({
  declarations: [
    PatientMComponent,
    AddPatientMComponent,
    EditPatientMComponent,
    ListPatientMComponent,
    PatientMProfileComponent
  ],
  imports: [
    CommonModule,
    PatientMRoutingModule,

    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class PatientMModule { }

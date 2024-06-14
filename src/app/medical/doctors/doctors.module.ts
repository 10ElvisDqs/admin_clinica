import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsComponent } from './doctors.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { ListDoctorComponent } from './list-doctor/list-doctor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DoctorMProfileComponent } from './doctor-m-profile/doctor-m-profile.component';


@NgModule({
  declarations: [
    DoctorsComponent,
    AddDoctorComponent,
    EditDoctorComponent,
    ListDoctorComponent,
    DoctorMProfileComponent
  ],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    SharedModule,
    //
    //
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class DoctorsModule { }

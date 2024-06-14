import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorsComponent } from './doctors.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { ListDoctorComponent } from './list-doctor/list-doctor.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { DoctorMProfileComponent } from './doctor-m-profile/doctor-m-profile.component';

const routes: Routes = [
  {
    path: '',
    component: DoctorsComponent,
    children: [
      {
        path: 'register',
        component: AddDoctorComponent
      },
      {
        path: 'list',
        component: ListDoctorComponent
      },
      {
        path: 'list/edit/:id',
        component: EditDoctorComponent
      },
      {
        path: 'list/profile/:id',
        component: DoctorMProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientMComponent } from './patient-m.component';
import { AddPatientMComponent } from './add-patient-m/add-patient-m.component';
import { ListPatientMComponent } from './list-patient-m/list-patient-m.component';
import { EditPatientMComponent } from './edit-patient-m/edit-patient-m.component';
import { PatientMProfileComponent } from './patient-m-profile/patient-m-profile.component';

const routes: Routes = [{
  path: '',
  component: PatientMComponent,
  children: [
    {
      path: 'register',
      component: AddPatientMComponent,
    },
    {
      path: 'list',
      component: ListPatientMComponent,
    },
    {
      path: 'list/edit/:id',
      component: EditPatientMComponent,
    },
    {
      path: 'list/profile/:id',
      component: PatientMProfileComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientMRoutingModule { }

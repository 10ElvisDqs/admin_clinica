import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentComponent } from './appointment.component';
import { AddAppointmentsComponent } from './add-appointments/add-appointments.component';
import { ListAppointmentsComponent } from './list-appointments/list-appointments.component';
import { EditAppointmentsComponent } from './edit-appointments/edit-appointments.component';
import { AtencionMedicalComponent } from './atencion-medical/atencion-medical.component';

const routes: Routes = [
  {
    path: '',
    component: AppointmentComponent,
    children: [
      {
        path: 'register',
        component: AddAppointmentsComponent,
      },
      {
        path: 'list',
        component: ListAppointmentsComponent,
      },
      {
        path: 'list/edit/:id',
        component: EditAppointmentsComponent,
      },
      {
        path: 'list/atencion-medica/:id',
        component: AtencionMedicalComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentPayComponent } from './appointment-pay.component';
import { ListAppointmentPayComponent } from './list-appointment-pay/list-appointment-pay.component';

const routes: Routes = [
  {
    path: '',
    component: AppointmentPayComponent,
    children: [
      {
        path: 'list',
        component: ListAppointmentPayComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentPayRoutingModule { }

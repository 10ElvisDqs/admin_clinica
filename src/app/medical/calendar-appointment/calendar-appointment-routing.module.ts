import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarAppointmentComponent } from './calendar-appointment.component';
import { AppointmentCalendarComponent } from './appointment-calendar/appointment-calendar.component';

const routes: Routes = [
  {
    path: '',
    component: CalendarAppointmentComponent,
    children: [
      {
        path: 'show',
        component: AppointmentCalendarComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarAppointmentRoutingModule { }

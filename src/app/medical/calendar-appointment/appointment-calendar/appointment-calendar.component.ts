import { Component } from '@angular/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AppointmentPayService } from '../../appointment-pay/service/appointment-pay.service';
import { CalendarAppointmentService } from '../service/calendar-appointment.service';

@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.scss']
})
export class AppointmentCalendarComponent {

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  events: any[] = [];

  public specialities:any  = [];
  public specialitie_id = '';
  public search_doctor = '';
  public search_patient = '';

  constructor(
    public appointmentPayService: AppointmentPayService,
    public appointmentCalendarService: CalendarAppointmentService,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // this.data.getEvents().subscribe((events: any) => {
    //   this.events = events;
    //   this.options = { ...this.options, ...{ events: events.data } };
    // });
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialDate: new Date(),
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      initialView: 'dayGridMonth',
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      events: [
        { title: 'Meeting', start: new Date() }
      ]
    };
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.appointmentPayService.listConfig().subscribe((resp:any) => {
      this.specialities = resp.specialities;

    })
    this.calendarAppointment();
  }
  calendarAppointment() {
    let data = {
      specialitie_id: this.specialitie_id,
      search_doctor: this.search_doctor,
      search_patient: this.search_patient,
    }
    this.appointmentCalendarService.calendarAppointment(data).subscribe((resp:any) => {
      console.log(resp);
      this.options = { ...this.options, ...{ events: resp.appointments } };
    })
  }

  searchData(){
    this.calendarAppointment();
  }
}

import { Component } from '@angular/core';
import { AppointmentService } from '../service/appointment.service';

@Component({
  selector: 'app-add-appointments',
  templateUrl: './add-appointments.component.html',
  styleUrls: ['./add-appointments.component.scss']
})
export class AddAppointmentsComponent {


  hours:any = [];
  specialities:any = [];
  date_appointment:any;
  hour:any;
  specialitie_id:any;

  name:string = '';
  surname:string = '';
  mobile:string = '';
  n_document:number = 0;
  name_companion:string = '';
  surname_companion:string = '';

  amount:number = 0;
  amount_add:number = 0;
  method_payment:string = '';

  DOCTORS:any = [];
  DOCTOR_SELECTED:any;
  selected_segment_hour:any;

  public text_success:string = '';
  public text_validation:string = '';
  constructor(
    public appointmentService: AppointmentService,
  ) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.appointmentService.listConfig().subscribe((resp:any) => {
      this.hours = resp.hours;
      this.specialities = resp.specialities;
    })
  }
  save(){
    this.text_validation = "";

    if(this.amount < this.amount_add){
      this.text_validation = "EL MONTO INGRESADO COMO ADELANTO NO PUEDE SER MAYOR AL COSTO DE LA CITA MEDICA";
      return;
    }

    if(!this.name || !this.surname || !this.mobile || !this.n_document || !this.name_companion || !this.surname_companion || !this.date_appointment
      || !this.specialitie_id || !this.selected_segment_hour || !this.amount || !this.amount_add || !this.method_payment){
      this.text_validation = "LOS CAMPOS SON NECESARIOS (SEGMENTO DE HORA, LA FECHA , LA ESPECIALIDAD, PACIENTE Y PAGOS)";
      return;
    }



    let data = {
      "doctor_id": this.DOCTOR_SELECTED.doctor.id,
      // "patient_id",
      name: this.name,
      surname: this.surname,
      mobile: this.mobile,
      n_document: this.n_document,
      name_companion: this.name_companion,
      surname_companion: this.surname_companion,
      "date_appointment": this.date_appointment,
      "specialitie_id": this.specialitie_id,
      "doctor_schedule_join_hour_id": this.selected_segment_hour.id,
      amount: this.amount,
      amount_add: this.amount_add,
      method_payment: this.method_payment,
    }

    this.appointmentService.registerAppointment(data).subscribe((resp:any) => {
      console.log(resp);

      this.text_success = "LA CITA MEDICA SE REGISTRO CON EXITO";
    });
  }

  filtro(){
    let data = {
      date_appointment: this.date_appointment,
      hour: this.hour,
      specialitie_id : this.specialitie_id,
    }
    this.appointmentService.listFilter(data).subscribe((resp:any) => {
      console.log(resp);
      this.DOCTORS = resp.doctors;
    })
  }

  countDisponibilidad(DOCTOR:any){
    let SEGMENTS = [];
    SEGMENTS = DOCTOR.segments.filter((item:any) => !item.is_appointment);
    return SEGMENTS.length;
  }

  showSegment(DOCTOR:any){
    this.DOCTOR_SELECTED = DOCTOR;
  }

  selectSegment(SEGMENT:any){
    this.selected_segment_hour = SEGMENT;
  }

  filterPatient(){
    this.appointmentService.listPatient(this.n_document+"").subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        this.name = '';
        this.surname = '';
        this.mobile = ''
        this.n_document = 0;
      }else{
        this.name = resp.name;
        this.surname = resp.surname;
        this.mobile = resp.mobile;
        this.n_document = resp.n_document;
      }
    })
  }

  resetPatient(){
    this.name = '';
    this.surname = '';
    this.mobile = ''
    this.n_document = 0;
  }
}

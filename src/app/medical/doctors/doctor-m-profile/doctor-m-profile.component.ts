import { Component } from '@angular/core';
import { DoctorService } from '../service/doctor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctor-m-profile',
  templateUrl: './doctor-m-profile.component.html',
  styleUrls: ['./doctor-m-profile.component.scss']
})
export class DoctorMProfileComponent {
  doctorProfile:any = [];
  option_selected:number = 1;

  doctor_id:string = '';

  name:string = '';
  surname:string = '';
  mobile:string = '';
  email:string = '';
  address:string = '';
  password:string = '';
  password_repet:string = '';

  num_appointment:number = 0;
  money_of_appointments:number = 0;
  num_appointment_pendings:number = 0;
  doctor_selected:any;
  appointment_pendings:any = [];
  appointments:any = [];
  public text_success:string = '';
  public text_validation:string = '';
  constructor(
    public doctorService: DoctorService,
    public activedRoute: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activedRoute.params.subscribe((resp:any) => {
      console.log(resp);
      this.doctor_id = resp.id;
    })
    this.doctorService.profileDoctor(this.doctor_id).subscribe((resp:any) => {
      console.log(resp);
      this.num_appointment = resp.num_appointment;
      this.money_of_appointments = resp.money_of_appointments;
      this.num_appointment_pendings = resp.num_appointment_pendings;
      this.doctor_selected = resp.doctor;
      this.appointment_pendings = resp.appointment_pendings.data;
      this.appointments = resp.appointments;

      this.name = this.doctor_selected.name;
      this.surname = this.doctor_selected.surname;
      this.mobile = this.doctor_selected.mobile;
      this.email = this.doctor_selected.email;
      this.address = this.doctor_selected.address;
    })
  }

  optionSelected(value:number){
    this.option_selected = value;
  }

  update(){
    this.text_validation = '';
    this.text_success = '';
    if(!this.name || !this.email || !this.surname){
      this.text_validation = "LOS CAMPOS SON NECESARIOS (name,surname,email,avatar)";
      return;
    }
    if(this.password){
      if(this.password != this.password_repet){
        this.text_validation = "LAS CONTRASEÑA DEBEN SER IGUALES";
        return;
      }
    }
    let data:any = {
      name: this.name,
      surname: this.surname,
      mobile: this.mobile,
      email: this.email,
      address: this.address,
    }
    if(this.password){
      data.password = this.password;
    }
    this.doctorService.updateDoctorProfile(this.doctor_id,data).subscribe((resp:any) => {
      console.log(resp);

      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{
        this.text_success = 'El usuario ha sido editado correctamente';
      }

    })

  }
}

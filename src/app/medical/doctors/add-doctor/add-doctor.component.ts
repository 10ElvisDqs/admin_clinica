import { Component } from '@angular/core';
import { DoctorService } from '../service/doctor.service';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.scss']
})
export class AddDoctorComponent {
  public selectedValue !: string  ;
  public name:string = '';
  public surname:string = '';
  public mobile:string = '';
  public email:string = '';
  public password:string = '';
  public password_confirmation:string = '';

  public birth_date:string = '';
  public gender:number = 1;
  public education:string = '';
  public designation:string = '';
  public address:string = '';

  public roles:any=[];
  public FILE_AVATAR:any;
  public IMAGEN_PREVUZUALIZADA:any='assets/img/user-06.jpg';

  public specialitie_id:any;
  public specialities:any=[];

  public text_success:string = '';
  public text_validation:string = '';

  public days_week = [
    {
      day:'Lunes',
      class:'table-primary'
    },
    {
      day:'Martes',
      class:'table-secondary'
    },
    {
      day:'Miercoles',
      class:'table-success'
    },
    {
      day:'Jueves',
      class:'table-warning'
    },
    {
      day:'Viernes',
      class:'table-info'
    }
  ];
  public hours_selecteds:any = [];
  public hours_days:any = [];


  constructor(
    public doctorService:DoctorService,

  ){
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     this.doctorService.listConfig().subscribe((resp:any)=>{
        console.log(resp);
        this.roles=resp.roles;
        this.specialities = resp.specialities;
        this.hours_days = resp.hours_days;
     })
  }


  save(){

    this.text_validation='';
    if (!this.name || !this.email || !this.surname || !this.FILE_AVATAR || !this.password) {
      this.text_validation='LOS CAMPOS SON NECESARIOS (name,surname,email,avatar)';
      return;
    }

    if ( this.password != this.password_confirmation) {
      this.text_validation='LAS CONTRASEÑAS DEBEN SER IGUALES';
      return;
    }

    if ( this.hours_selecteds.length == 0 ) {
      this.text_validation='NECESITAS SELECCIONAR UN HORARIO AL MENOS';
      return;
    }

    console.log(this.selectedValue);
    let formData=new FormData();
    formData.append('name',this.name);
    formData.append('surname',this.surname);
    formData.append('email',this.email);
    formData.append('mobile',this.mobile);
    formData.append('birth_date',this.birth_date);
    formData.append('gender',this.gender+'');
    formData.append('education',this.education);
    formData.append('designation',this.designation);
    formData.append('address',this.address);
    formData.append('password',this.password);
    formData.append('role_id',this.selectedValue);
    formData.append('specialitie_id',this.specialitie_id);
    formData.append('imagen',this.FILE_AVATAR);

    let HOUR_SCHEDULES:any = [];
    this.days_week.forEach((day:any)=> {
      let DAYS_HOURS = this.hours_selecteds.filter((hour_select:any)=> hour_select.day_name == day.day );
      HOUR_SCHEDULES.push({
        day_name:day.day,
        children: DAYS_HOURS,
      })
    });

    formData.append('schedule_hours',JSON.stringify(HOUR_SCHEDULES));

    this.doctorService.registerDoctor(formData).subscribe((resp:any)=>{
      console.log(resp);

      if (resp.message == 403) {
        this.text_validation=resp.message_text;
      } else {
        this.text_success='EL USUARIO HA SIDO REGISTRADO CORRECTAMENTE';

         this.name='';
         this.surname='';
         this.email='';
         this.mobile='';
         this.birth_date='';
         this.gender= 1 ;
         this.education='';
         this.designation='';
         this.address='';
         this.password='';
         this.password_confirmation='';
         this.selectedValue='';
         this.specialitie_id='';
         this.FILE_AVATAR= null;
         this.IMAGEN_PREVUZUALIZADA=null;
         this.hours_selecteds=[];
      }

    })
  }

  loadFile($event:any){
    if ( $event.target.files[0].type.indexOf("image") < 0) {
      // alert('SOLAMENTE PUEDEN SER ARCHIVOS DE TIPO IMAGEN');
      this.text_validation = 'SOLAMENTE PUEDEN SER ARCHIVOS DE TIPO IMAGEN';
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR=$event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    console.log(reader);
    reader.onloadend=()=>this.IMAGEN_PREVUZUALIZADA = reader.result;
    console.log(reader);
  }

  addHourItem(hours_day:any,day:any,item:any){

    let INDEX = this.hours_selecteds.findIndex((hour:any) =>
                 hour.day_name == day.day &&
                 hour.hour == hours_day.hour &&
                 hour.item.hour_start == item.hour_start && hour.item.hour_end == item.hour_end

                );
    if (INDEX != -1) {
      this.hours_selecteds.splice(INDEX,1);
    }else{

      this.hours_selecteds.push({
        "day":day,
        "day_name":day.day,
        "hours_day":hours_day,
        "hour":hours_day.hour,
        "grupo":"none",
        "item":item
      });
    }

    console.log(this.hours_selecteds);
  }

  addHourAll(hours_day:any,day:any){
    let INDEX = this.hours_selecteds.findIndex((hour:any) =>
      hour.day_name == day.day &&
      hour.hour == hours_day.hour && hour.grupo == "all" );

    let COUNT_SELECTED = this.hours_selecteds.filter((hour:any) =>
      hour.day_name == day.day &&
      hour.hour == hours_day.hour ).length;

      if (INDEX != -1 &&  COUNT_SELECTED == hours_day.items.length ) {
      ////////////////////////////
      hours_day.items.forEach((item:any) => {
        let INDEX = this.hours_selecteds.findIndex((hour:any) =>
          hour.day_name == day.day &&
          hour.hour == hours_day.hour &&
          hour.item.hour_start == item.hour_start && hour.item.hour_end == item.hour_end

                );
        if (INDEX != -1) {
            this.hours_selecteds.splice(INDEX,1);
        }

      });
      /////////////////////////////
    }else{

      hours_day.items.forEach((item:any) => {
        let INDEX = this.hours_selecteds.findIndex((hour:any) =>
          hour.day_name == day.day &&
          hour.hour == hours_day.hour &&
          hour.item.hour_start == item.hour_start && hour.item.hour_end == item.hour_end

                );
        if (INDEX != -1) {
          this.hours_selecteds.splice(INDEX,1);
        }
        this.hours_selecteds.push({
          "day":day,
          "day_name":day.day,
          "hours_day":hours_day,
          "hour":hours_day.hour,
          "grupo":"all",
          "item":item
        });

      });
    }

    console.log(this.hours_selecteds);
  }

  isCheckedHour(hours_day:any,day:any,item:any):boolean{
    let INDEX = this.hours_selecteds.findIndex((hour:any) =>
      hour.day_name == day.day &&
      hour.hour == hours_day.hour &&
      hour.item.hour_start == item.hour_start && hour.item.hour_end == item.hour_end

        );
    if (INDEX != -1) {
      return true;
    }else{
      return false;
    }

  }
  isCheckedHourAll(hours_day:any,day:any):boolean{
    let INDEX = this.hours_selecteds.findIndex((hour:any) =>
      hour.day_name == day.day &&
      hour.hour == hours_day.hour && hour.grupo == "all" );

    let COUNT_SELECTED = this.hours_selecteds.filter((hour:any) =>
      hour.day_name == day.day &&
      hour.hour == hours_day.hour ).length;

      if (INDEX != -1 &&  COUNT_SELECTED == hours_day.items.length ) {
      ////////////////////////////
      return true;
      /////////////////////////////
    }else{
      return false;
    };

  }

  addHourAllDay($event:any,hours_day:any){
    let INDEX = this.hours_selecteds.findIndex((hour:any) =>
      hour.hour == hours_day.hour );
    if (INDEX != -1 && !$event.currentTarget.checked) {

      this.days_week.forEach((day:any) => {
        hours_day.items.forEach((item:any) => {
          let INDEX = this.hours_selecteds.findIndex((hour:any) =>
            hour.day_name == day.day &&
            hour.hour == hours_day.hour &&
            hour.item.hour_start == item.hour_start && hour.item.hour_end == item.hour_end

                  );
          if (INDEX != -1) {
              this.hours_selecteds.splice(INDEX,1);
          }

        });
      });

    }else{
      //////////////////////////////////
      this.days_week.forEach((day:any) => {

        hours_day.items.forEach((item:any) => {
          let INDEX = this.hours_selecteds.findIndex((hour:any) => hour.day_name == day.day
                                    && hour.hour == hours_day.hour
                                    && hour.item.hour_start == item.hour_start && hour.item.hour_end == item.hour_end );
          if (INDEX != -1) {
              this.hours_selecteds.splice(INDEX,1);
          }
        });
      });
      /////////////////////////////////
      setTimeout(() => {
        this.days_week.forEach((day:any) => {
          this.addHourAll(hours_day,day);

        });
      }, 25);

    }

  }
}

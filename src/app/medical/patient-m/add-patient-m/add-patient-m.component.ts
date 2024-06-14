import { Component } from '@angular/core';
import { PatientMService } from '../service/patient-m.service';

@Component({
  selector: 'app-add-patient-m',
  templateUrl: './add-patient-m.component.html',
  styleUrls: ['./add-patient-m.component.scss']
})
export class AddPatientMComponent {
  public selectedValue !: string  ;
  public name:string = '';
  public surname:string = '';
  public mobile:string = '';
  public email:string = '';

  public birth_date:string = '';
  public gender:number = 1;
  public education:string = '';
  public address:string = '';

  public antecedent_family:string = '';
  public antecedent_personal:string = '';
  public antecedent_allergic:string = '';

  public name_companion:string = '';
  public surname_companion:string = '';
  public mobile_companion:string = '';
  public relationship_companion:string = '';

  public name_responsible:string = '';
  public surname_responsible:string = '';
  public mobile_responsible:string = '';
  public relationship_responsible:string = '';

  public current_disease:string = '';

  public ta :number = 0;
  public temperatura :number = 0;
  public fc :number = 0;
  public fr :number = 0;
  public peso :number = 0;

  public n_document:any = null;

  public roles:any = [];

  public FILE_AVATAR:any;
  public IMAGEN_PREVIZUALIZA:any = 'assets/img/user-06.jpg';

  public text_success:string = '';
  public text_validation:string = '';
  constructor(
    public patientService: PatientMService,
  ) {

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.patientService.listConfig().subscribe((resp:any) => {
    //   console.log(resp);
    //   this.roles = resp.roles;
    // })
  }

  save(){
    this.text_validation = '';
    if(!this.name || !this.n_document || !this.surname || !this.mobile){
      this.text_validation = "LOS CAMPOS SON NECESARIOS (Nombre,Apellido,° n de document, telefono)";
      return;
    }
    if(!this.name_companion || !this.surname_companion){
      this.text_validation = "EL NOPMBRE Y APELLIDO DEL ACOMPAÑANTE ES OBLIGATORIO (Nombre,Apellido)";
      return;
    }

    if(!this.ta || !this.temperatura || !this.fc || !this.fr || !this.peso){
      this.text_validation = "LOS SIGNOS VITALES SON OBLIGATORIO";
      return;
    }

    console.log(this.selectedValue);

    let formData = new FormData();
    formData.append("name",this.name);
    formData.append("surname",this.surname);
    if(this.email){
      formData.append("email",this.email);
    }
    formData.append("mobile",this.mobile);
    formData.append("n_document",this.n_document);
    if(this.birth_date){
      formData.append("birth_date",this.birth_date);
    }
    formData.append("gender",this.gender+"");
    if(this.education){
      formData.append("education",this.education);
    }
    if(this.address){
      formData.append("address",this.address);
    }
    if(this.FILE_AVATAR){
      formData.append("imagen",this.FILE_AVATAR);
    }
    if(this.antecedent_family){
      formData.append("antecedent_family",this.antecedent_family);
    }
    if(this.antecedent_personal){
      formData.append("antecedent_personal",this.antecedent_personal);
    }
    if(this.antecedent_allergic){
      formData.append("antecedent_allergic",this.antecedent_allergic);
    }

    formData.append("name_companion",this.name_companion);
    formData.append("surname_companion",this.surname_companion);
    if(this.mobile_companion){
      formData.append("mobile_companion",this.mobile_companion);
    }
    if(this.relationship_companion){
      formData.append("relationship_companion",this.relationship_companion);
    }
    if(this.name_responsible){
      formData.append("name_responsible",this.name_responsible);
    }
    if(this.surname_responsible){
      formData.append("surname_responsible",this.surname_responsible);
    }
    if(this.mobile_responsible){
      formData.append("mobile_responsible",this.mobile_responsible);
    }
    if(this.relationship_responsible){
      formData.append("relationship_responsible",this.relationship_responsible);
    }
    if(this.current_disease){
      formData.append("current_disease",this.current_disease);
    }

    formData.append("ta",this.ta+"");
    formData.append("temperatura",this.temperatura+"");
    formData.append("fc",this.fc+"");
    formData.append("fr",this.fr+"");
    formData.append("peso",this.peso+"");
    this.patientService.registerPatient(formData).subscribe((resp:any) => {
      console.log(resp);

      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{
        this.text_success = 'El paciente ha sido registrado correctamente';

        this.name = '';
        this.surname = '';
        this.email  = '';
        this.mobile  = '';
        this.birth_date  = '';
        this.gender  = 1;
        this.education  = '';

        this.n_document  = '';
        this.antecedent_family  = '';
        this.antecedent_personal  = '';
        this.antecedent_allergic  = '';
        this.name_companion  = '';
        this.surname_companion  = '';
        this.mobile_companion  = '';
        this.relationship_companion  = '';
        this.name_responsible  = '';
        this.surname_responsible  = '';
        this.mobile_responsible  = '';
        this.relationship_responsible  = '';
        this.current_disease  = '';
        this.ta = 0;
        this.temperatura = 0;
        this.fc = 0;
        this.fr = 0;
        this.peso = 0;
        this.address  = '';
        this.selectedValue  = '';
        this.FILE_AVATAR = null;
        this.IMAGEN_PREVIZUALIZA = null;
      }
    })
  }

  loadFile($event:any){
    if($event.target.files[0].type.indexOf("image") < 0){
      // alert("SOLAMENTE PUEDEN SER ARCHIVOS DE TIPO IMAGEN");
      this.text_validation = "SOLAMENTE PUEDEN SER ARCHIVOS DE TIPO IMAGEN";
      return;
    }
    this.text_validation = '';
    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = () => this.IMAGEN_PREVIZUALIZA = reader.result;
  }
}

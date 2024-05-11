import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpecialitieService } from '../service/specialitie.service';

@Component({
  selector: 'app-edit-specialitie',
  templateUrl: './edit-specialitie.component.html',
  styleUrls: ['./edit-specialitie.component.scss']
})
export class EditSpecialitieComponent {

  
  name:string = '';
  state:number = 1;
  valid_form: boolean = false;
  valid_form_success: boolean = false;
  text_validation:any = null;

  specialitie_id:any;
  constructor(
    public specialitieService: SpecialitieService,
    public activedRoute: ActivatedRoute,
  ) {
    
  }
  ngOnInit(): void {
    this.activedRoute.params.subscribe((resp:any) => {
      this.specialitie_id = resp.id;
    })
    this.showSpecialitie();
  }

  showSpecialitie(){
    this.specialitieService.showSpecialities(this.specialitie_id).subscribe((resp:any) => {
      console.log(resp);
      this.name = resp.name;
      this.state = resp.state;
    })
  }

  save(){
    this.valid_form = false;
    if(!this.name){
      this.valid_form = true;
      return;
    }
    let data = {
      name: this.name,
      state:this.state,
    };
    this.valid_form_success = false;
    this.text_validation = null;
    this.specialitieService.editSpecialities(data,this.specialitie_id).subscribe((resp:any) => {
      console.log(resp);
      if(resp.message == 403){
        this.text_validation = resp.message_text;
        return ;
      }
      this.valid_form_success = true;
    })
  }
}

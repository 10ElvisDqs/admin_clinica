import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { RolesService } from '../service/roles.service';

@Component({
  selector: 'app-add-role-user',
  templateUrl: './add-role-user.component.html',
  styleUrls: ['./add-role-user.component.scss']
})
export class AddRoleUserComponent {

  sideBar:any = [];
  name:string = '';
  permissions:any = [];
  valid_form:boolean = false;
  valid_form_success:boolean = false;
  text_validation:any=null;

  constructor(
    public DataService:DataService,
    public RoleService:RolesService,
  ){};

  ngOnInit():void{
    this.sideBar = this.DataService.sideBar[0].menu;
    //console.log(this.sideBar);
  }

  addPermission(subMenu:any){
    if (subMenu.permision) {
      let INDEX = this.permissions.findIndex((item:any)=> item == subMenu.permision);
      if (INDEX!=-1) {
        this.permissions.splice(INDEX,1);
      } else {
        this.permissions.push(subMenu.permision);
      }

      console.log(this.permissions);

    }
  }

  save():void{
    this.valid_form = false;
    if(!this.name || this.permissions.length == 0 ){
      this.valid_form = true;
      return;
    }
    let data= {
      name: this.name,
      permisions:this.permissions,
    };


    console.log("ENVIADO");
    this.valid_form_success=false;
    this.text_validation= null;
    this.RoleService.storeRoles(data).subscribe((resp:any)=>{
      console.log(resp);

      if (resp.message == 403) {
        this.text_validation=resp.message_text;
      }else{
        this.name='';
        this.permissions=[];
        this.valid_form_success=true;

        let SIDE_BAR= this.sideBar;
        this.sideBar=[];
        setTimeout(()=>{
          this.sideBar=SIDE_BAR;

        },50);

      }

    })

  }
}

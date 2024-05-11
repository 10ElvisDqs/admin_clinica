import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    public http:HttpClient,
    public authService:AuthService,
  ) { }

  listRoles(){
    let headers = new HttpHeaders({'Authorization':'Bearer '+this.authService.token });
    let URL = URL_SERVICIOS+"/roles";
    return this.http.get(URL,{headers:headers});
  }

  showRole(role_id:string){
    let headers = new HttpHeaders({'Authorization':'Bearer '+this.authService.token });
    let URL = URL_SERVICIOS+"/roles/"+role_id;
    return this.http.get(URL,{headers:headers});
  }

  storeRoles(data:any){
    let headers = new HttpHeaders({'Authorization':'Bearer '+this.authService.token });
    let URL = URL_SERVICIOS+"/roles";
    return this.http.post(URL,data,{headers:headers});
  }

  editRoles(data:any,id_role:any){
    let headers = new HttpHeaders({'Authorization':'Bearer '+this.authService.token });
    let URL = URL_SERVICIOS+"/roles/"+id_role;
    console.log(data);
    return this.http.put(URL,data,{headers:headers});
  }

  deleteRoles(id_role:any){
    let headers = new HttpHeaders({'Authorization':'Bearer '+this.authService.token });
    let URL = URL_SERVICIOS+"/roles/"+id_role;
    return this.http.delete(URL,{headers:headers});
  }
}

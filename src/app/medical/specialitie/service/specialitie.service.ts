import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpecialitieService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  listSpecialities(){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/specialities";
    return this.http.get(URL,{headers: headers});
  }

  showSpecialities(role_id:string){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/specialities/"+role_id;
    return this.http.get(URL,{headers: headers});
  }

  storeSpecialities(data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/specialities";
    return this.http.post(URL,data,{headers: headers});
  }

  editSpecialities(data:any,id_specialitie:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/specialities/"+id_specialitie;
    return this.http.put(URL,data,{headers: headers});
  }

  deleteSpecialities(id_specialitie:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/specialities/"+id_specialitie;
    return this.http.delete(URL,{headers: headers});
  }
  
}

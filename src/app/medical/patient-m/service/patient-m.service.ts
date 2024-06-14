import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientMService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  listPatients(page:number=1,search:string=''){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/patients?page="+page+"&search="+search;
    return this.http.get(URL,{headers: headers});
  }

  registerPatient(data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/patients";
    return this.http.post(URL,data,{headers: headers});
  }

  showPatient(staff_id:string){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/patients/"+staff_id;
    return this.http.get(URL,{headers: headers});
  }

  updatePatient(staff_id:string,data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/patients/"+staff_id;
    return this.http.post(URL,data,{headers: headers});
  }

  deletePatient(staff_id:string){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/patients/"+staff_id;
    return this.http.delete(URL,{headers: headers});
  }

  profilePatient(staff_id:string){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/patients/profile/"+staff_id;
    return this.http.get(URL,{headers: headers});
  }

}

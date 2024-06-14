import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  listDoctors(){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/doctors";
    return this.http.get(URL,{headers: headers});
  }

  listConfig(){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/doctors/config";
    return this.http.get(URL,{headers: headers});
  }

  registerDoctor(data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/doctors";
    return this.http.post(URL,data,{headers: headers});
  }

  showDoctor(doctor_id:string){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/doctors/"+doctor_id;
    return this.http.get(URL,{headers: headers});
  }

  updateDoctor(doctor_id:string,data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/doctors/"+doctor_id;
    return this.http.post(URL,data,{headers: headers});
  }

  updateDoctorProfile(doctor_id:string,data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/staffs/"+doctor_id;
    return this.http.post(URL,data,{headers: headers});
  }

  deleteDoctor(doctor_id:string){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/doctors/"+doctor_id;
    return this.http.delete(URL,{headers: headers});
  }

  profileDoctor(doctor_id:string){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/doctors/profile/"+doctor_id;
    return this.http.get(URL,{headers: headers});
  }
}

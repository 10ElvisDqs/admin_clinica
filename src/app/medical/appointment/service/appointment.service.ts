import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  listAppointments(page:number=1,search:string = '',specialitie_id:string = '',date:any = null){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let LINK = "";
    if(search){
      LINK+="&search="+search;
    }
    if(specialitie_id){
      LINK+="&specialitie_id="+specialitie_id;
    }
    if(date){
      LINK+="&date="+date;
    }
    let URL = URL_SERVICIOS+"/appointmet?page="+page+LINK;
    return this.http.get(URL,{headers: headers});
  }

  listConfig(){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/appointmet/config";
    return this.http.get(URL,{headers: headers});
  }

  listPatient(n_document:string = ''){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/appointmet/patient?n_document="+n_document;
    return this.http.get(URL,{headers: headers});
  }

  registerAppointment(data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/appointmet";
    return this.http.post(URL,data,{headers: headers});
  }

  listFilter(data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/appointmet/filter";
    return this.http.post(URL,data,{headers: headers});
  }

  showAppointment(appointmet_id:string){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/appointmet/"+appointmet_id;
    return this.http.get(URL,{headers: headers});
  }

  updateAppointment(appointmet_id:string,data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/appointmet/"+appointmet_id;
    return this.http.put(URL,data,{headers: headers});
  }

  deleteAppointment(appointmet_id:string){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/appointmet/"+appointmet_id;
    return this.http.delete(URL,{headers: headers});
  }
  //

  registerAttention(data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/appointmet-attention";
    return this.http.post(URL,data,{headers: headers});
  }

  showAppointmentAttention(appointmet_id:string){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/appointmet-attention/"+appointmet_id;
    return this.http.get(URL,{headers: headers});
  }
}

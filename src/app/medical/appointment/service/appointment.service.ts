import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  listAppointments(page=1, search = '', specialitie_id = '', date_start: any = null, date_end: any = null) {
    const headers = new HttpHeaders({'Authorization': 'Bearer ' + this.authService.token});
    let LINK = "";
    if (search) {
      LINK += "&search=" + search;
    }
    if (specialitie_id) {
      LINK += "&specialitie_id=" + specialitie_id;
    }
    if (date_start) {
      LINK += "&date_start=" + date_start;
    }
    if (date_end) {
      LINK += "&date_end=" + date_end;
    }
    const URL = URL_SERVICIOS + "/appointmet?page=" + page + LINK;
    return this.http.get(URL, {headers: headers});
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

  generateReport(specialitie_id = '', search: string ='', date_start: any = null, date_end: any = null): Observable<Blob> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    // let params = new HttpParams();
    let LINK = "";
    if (search) {
      LINK += "&search=" + search;
    }
    if (specialitie_id) {
      LINK += "&specialitie_id=" + specialitie_id;
    }
    if (date_start) {
      LINK += "&date_start=" + date_start;
    }
    if (date_end) {
      LINK += "&date_end=" + date_end;
    }
    const URL = URL_SERVICIOS + "/appointmet/reporte?page=1"+ LINK;
    console.log(URL);
    return this.http.get(URL, {headers: headers, responseType: 'blob' });
    // return this.http.get(`${URL_SERVICIOS}/appointmet/reporte`, { headers: headers, params: params, responseType: 'blob' });
  }

  generateReceta(appointment_id:number, patient_id:number): Observable<Blob> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    // let params = new HttpParams();
    let LINK = "";

    if (appointment_id) {
      LINK += "appointment_id=" + appointment_id;
    }
    if (patient_id) {
      LINK += "&patient_id=" + patient_id;
    }

    const URL = URL_SERVICIOS + "/appointmet-attention/receta?"+ LINK;
    console.log(URL);
    return this.http.get(URL, {headers: headers, responseType: 'blob' });
    // return this.http.get(`${URL_SERVICIOS}/appointmet/reporte`, { headers: headers, params: params, responseType: 'blob' });
  }
}

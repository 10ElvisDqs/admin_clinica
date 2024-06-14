import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarAppointmentService {

  constructor(
    public http: HttpClient,
    public authService: AuthService,
  ) { }

  calendarAppointment(data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authService.token});
    let URL = URL_SERVICIOS+"/appointmet/calendar";
    return this.http.post(URL,data,{headers: headers});
  }

}

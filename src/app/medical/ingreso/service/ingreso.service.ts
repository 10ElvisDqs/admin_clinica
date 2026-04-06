import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class IngresoService {

  constructor(public http: HttpClient, public authService: AuthService) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
  }

  listIngresos(page = 1, search = '', estado = '') {
    let LINK = '';
    if (search) LINK += '&search=' + search;
    if (estado) LINK += '&estado=' + estado;
    const URL = URL_SERVICIOS + '/ingresos?page=' + page + LINK;
    return this.http.get(URL, { headers: this.headers() });
  }

  getConfig() {
    return this.http.get(URL_SERVICIOS + '/ingresos/config', { headers: this.headers() });
  }

  registerIngreso(data: any) {
    return this.http.post(URL_SERVICIOS + '/ingresos', data, { headers: this.headers() });
  }

  showIngreso(id: number) {
    return this.http.get(URL_SERVICIOS + '/ingresos/' + id, { headers: this.headers() });
  }

  updateIngreso(id: number, data: any) {
    return this.http.put(URL_SERVICIOS + '/ingresos/' + id, data, { headers: this.headers() });
  }

  deleteIngreso(id: number) {
    return this.http.delete(URL_SERVICIOS + '/ingresos/' + id, { headers: this.headers() });
  }

  generateReport(search = '', estado = ''): Observable<Blob> {
    let LINK = '';
    if (search) LINK += '&search=' + search;
    if (estado) LINK += '&estado=' + estado;
    const URL = URL_SERVICIOS + '/ingresos/reporte?' + LINK;
    return this.http.get(URL, { headers: this.headers(), responseType: 'blob' });
  }
}

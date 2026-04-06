import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class EgresoService {

  constructor(public http: HttpClient, public authService: AuthService) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
  }

  listEgresos(page = 1, search = '', tipo = '') {
    let LINK = '';
    if (search) LINK += '&search=' + search;
    if (tipo)   LINK += '&tipo_egreso=' + tipo;
    const URL = URL_SERVICIOS + '/egresos?page=' + page + LINK;
    return this.http.get(URL, { headers: this.headers() });
  }

  getConfig() {
    return this.http.get(URL_SERVICIOS + '/egresos/config', { headers: this.headers() });
  }

  registerEgreso(data: any) {
    return this.http.post(URL_SERVICIOS + '/egresos', data, { headers: this.headers() });
  }

  showEgreso(id: number) {
    return this.http.get(URL_SERVICIOS + '/egresos/' + id, { headers: this.headers() });
  }

  updateEgreso(id: number, data: any) {
    return this.http.put(URL_SERVICIOS + '/egresos/' + id, data, { headers: this.headers() });
  }

  deleteEgreso(id: number) {
    return this.http.delete(URL_SERVICIOS + '/egresos/' + id, { headers: this.headers() });
  }

  generateReport(search = '', tipo = ''): Observable<Blob> {
    let LINK = '';
    if (search) LINK += '&search=' + search;
    if (tipo)   LINK += '&tipo_egreso=' + tipo;
    const URL = URL_SERVICIOS + '/egresos/reporte?' + LINK;
    return this.http.get(URL, { headers: this.headers(), responseType: 'blob' });
  }
}

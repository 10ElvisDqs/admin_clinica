import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class SeguimientoService {

  constructor(public http: HttpClient, public authService: AuthService) {}

  private headers(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
  }

  listSeguimientos(page = 1, search = '', estado = '') {
    let LINK = '';
    if (search) LINK += '&search=' + search;
    if (estado) LINK += '&estado=' + estado;
    const URL = URL_SERVICIOS + '/seguimientos?page=' + page + LINK;
    return this.http.get(URL, { headers: this.headers() });
  }

  getConfig() {
    return this.http.get(URL_SERVICIOS + '/seguimientos/config', { headers: this.headers() });
  }

  registerSeguimiento(data: any) {
    return this.http.post(URL_SERVICIOS + '/seguimientos', data, { headers: this.headers() });
  }

  showSeguimiento(id: number) {
    return this.http.get(URL_SERVICIOS + '/seguimientos/' + id, { headers: this.headers() });
  }

  updateSeguimiento(id: number, data: any) {
    return this.http.put(URL_SERVICIOS + '/seguimientos/' + id, data, { headers: this.headers() });
  }

  deleteSeguimiento(id: number) {
    return this.http.delete(URL_SERVICIOS + '/seguimientos/' + id, { headers: this.headers() });
  }

  generateReport(search = '', estado = ''): Observable<Blob> {
    let LINK = '';
    if (search) LINK += '&search=' + search;
    if (estado) LINK += '&estado=' + estado;
    const URL = URL_SERVICIOS + '/seguimientos/reporte?' + LINK;
    return this.http.get(URL, { headers: this.headers(), responseType: 'blob' });
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({ providedIn: 'root' })
export class PatientAuthService {

  public user: any = null;
  public token: any = null;

  constructor(private router: Router, public http: HttpClient) {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const raw = localStorage.getItem('patient_user');
    this.user  = raw ? JSON.parse(raw) : null;
    this.token = localStorage.getItem('patient_token');
  }

  getHeaders() {
    return new HttpHeaders({ Authorization: `Bearer ${this.token}` });
  }

  login(email: string, password: string) {
    return this.http.post(`${URL_SERVICIOS}/auth/login`, { email, password }).pipe(
      map((resp: any) => {
        if (resp && resp.access_token) {
          const roles: string[] = resp.user?.roles ?? [];
          if (!roles.includes('PACIENTE')) {
            return { ok: false, message: 'Esta cuenta no es de paciente.' };
          }
          localStorage.setItem('patient_token', resp.access_token);
          localStorage.setItem('patient_user',  JSON.stringify(resp.user));
          this.loadFromStorage();
          return { ok: true };
        }
        return { ok: false, message: 'Credenciales incorrectas.' };
      }),
      catchError(() => of({ ok: false, message: 'Error de conexión.' }))
    );
  }

  logout() {
    localStorage.removeItem('patient_token');
    localStorage.removeItem('patient_user');
    this.user  = null;
    this.token = null;
    this.router.navigate(['/patient/login']);
  }

  register(data: any) {
    return this.http.post(`${URL_SERVICIOS}/patient/register`, data).pipe(
      catchError((err) => {
        const msg = err?.error?.message_text || err?.message || 'Error de conexión.';
        return of({ message: 500, message_text: msg });
      })
    );
  }

  myProfile() {
    return this.http.get(`${URL_SERVICIOS}/patient-portal/my-profile`, { headers: this.getHeaders() });
  }

  myAppointments() {
    return this.http.get(`${URL_SERVICIOS}/patient-portal/my-appointments`, { headers: this.getHeaders() });
  }

  myHistory() {
    return this.http.get(`${URL_SERVICIOS}/patient-portal/my-history`, { headers: this.getHeaders() });
  }

  mySeguimientos() {
    return this.http.get(`${URL_SERVICIOS}/patient-portal/my-seguimientos`, { headers: this.getHeaders() });
  }

  // ── BOOKING ────────────────────────────────────────────────────────────
  bookingConfig() {
    return this.http.get(`${URL_SERVICIOS}/booking/config`);
  }

  doctorSchedule(doctorId: number) {
    return this.http.get(`${URL_SERVICIOS}/booking/doctor/${doctorId}/schedule`);
  }

  createCheckout(data: any) {
    return this.http.post(`${URL_SERVICIOS}/patient-portal/checkout`, data, { headers: this.getHeaders() });
  }

  createBilling(data: any) {
    return this.http.post(`${URL_SERVICIOS}/patient-portal/checkout`, { ...data, method: 'billing' }, { headers: this.getHeaders() });
  }

  // ── MÉTODOS DE PAGO ────────────────────────────────────────────────────
  getPaymentMethods() {
    return this.http.get(`${URL_SERVICIOS}/patient-portal/payment-methods`, { headers: this.getHeaders() });
  }

  addPaymentMethod(data: any) {
    return this.http.post(`${URL_SERVICIOS}/patient-portal/payment-methods`, data, { headers: this.getHeaders() });
  }

  setDefaultPaymentMethod(id: number) {
    return this.http.patch(`${URL_SERVICIOS}/patient-portal/payment-methods/${id}/default`, {}, { headers: this.getHeaders() });
  }

  deletePaymentMethod(id: number) {
    return this.http.delete(`${URL_SERVICIOS}/patient-portal/payment-methods/${id}`, { headers: this.getHeaders() });
  }
}

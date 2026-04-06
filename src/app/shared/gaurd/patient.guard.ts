import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class PatientGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('patient_token');
    const user  = localStorage.getItem('patient_user');

    if (!token || !user) {
      this.router.navigate(['/patient/login']);
      return false;
    }

    try {
      const expiration = (JSON.parse(atob(token.split('.')[1]))).exp;
      if (Math.floor(Date.now() / 1000) >= expiration) {
        localStorage.removeItem('patient_token');
        localStorage.removeItem('patient_user');
        this.router.navigate(['/patient/login']);
        return false;
      }
    } catch {
      this.router.navigate(['/patient/login']);
      return false;
    }

    return true;
  }
}

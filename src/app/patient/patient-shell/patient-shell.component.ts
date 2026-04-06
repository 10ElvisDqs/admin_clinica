import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PatientAuthService } from 'src/app/shared/auth/patient-auth.service';

@Component({
  selector: 'app-patient-shell',
  templateUrl: './patient-shell.component.html',
  standalone: false,
})
export class PatientShellComponent implements OnInit {
  user: any       = null;
  pendingCount    = 0;

  constructor(public auth: PatientAuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.auth.user;
    this.auth.myAppointments().subscribe({
      next: (r: any) => {
        const appointments: any[] = r.appointments || [];
        this.pendingCount = appointments.filter((a: any) => a.status === 1).length;
      },
      error: () => {},
    });
  }

  getInitials(name: string): string {
    if (!name) return '?';
    return name.split(' ').filter(Boolean).map((n: string) => n[0]).slice(0, 2).join('').toUpperCase();
  }

  logout() {
    this.auth.logout();
  }
}

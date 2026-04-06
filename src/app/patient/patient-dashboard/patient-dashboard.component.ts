import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientAuthService } from 'src/app/shared/auth/patient-auth.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss'],
  standalone: false,
})
export class PatientDashboardComponent implements OnInit {
  activeTab    = 'appointments';
  user: any    = null;
  patient: any = null;

  appointments: any[] = [];
  history: any[]      = [];
  seguimientos: any[] = [];

  loadingAppointments = true;
  loadingHistory      = true;
  loadingSeguimientos = true;

  statusPayLabel: any = { 1: 'Pendiente', 2: 'Pagado',  3: 'Anulado' };
  statusLabel: any    = { 1: 'Pendiente', 2: 'Atendido', 3: 'Cancelado' };
  statusPayClass: any = { 1: 'warning',   2: 'success',  3: 'danger' };
  statusClass: any    = { 1: 'warning',   2: 'success',  3: 'danger' };

  paymentStatus: 'success' | 'cancel' | null = null;

  constructor(
    private auth: PatientAuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.user = this.auth.user;
    this.loadProfile();
    this.loadAppointments();
    this.loadHistory();
    this.loadSeguimientos();

    // Retorno de Stripe
    const payment = this.route.snapshot.queryParamMap.get('payment');
    if (payment === 'success') { this.paymentStatus = 'success'; }
    if (payment === 'cancel')  { this.paymentStatus = 'cancel'; }
  }

  bookAppointment() {
    this.router.navigate(['/patient/book']);
  }

  loadProfile() {
    this.auth.myProfile().subscribe((r: any) => {
      this.patient = r.patient;
      this.user    = r.user;
    });
  }

  get attendedCount(): number {
    return this.appointments.filter((a: any) => a.status === 2).length;
  }

  get pendingCount(): number {
    return this.appointments.filter((a: any) => a.status === 1).length;
  }

  get nextAppointment(): any {
    return this.appointments.find((a: any) => a.status === 1) || null;
  }

  get attendedPercent(): number {
    if (!this.appointments.length) return 0;
    return Math.round((this.attendedCount / this.appointments.length) * 100);
  }

  loadAppointments() {
    this.loadingAppointments = true;
    this.auth.myAppointments().subscribe({
      next: (r: any) => { this.appointments = r.appointments || []; this.loadingAppointments = false; },
      error: ()      => { this.loadingAppointments = false; },
    });
  }

  loadHistory() {
    this.loadingHistory = true;
    this.auth.myHistory().subscribe({
      next: (r: any) => { this.history = r.history || []; this.loadingHistory = false; },
      error: ()      => { this.loadingHistory = false; },
    });
  }

  loadSeguimientos() {
    this.loadingSeguimientos = true;
    this.auth.mySeguimientos().subscribe({
      next: (r: any) => { this.seguimientos = r.seguimientos || []; this.loadingSeguimientos = false; },
      error: ()      => { this.loadingSeguimientos = false; },
    });
  }

  logout() {
    this.auth.logout();
  }

  getInitials(name: string): string {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  }
}

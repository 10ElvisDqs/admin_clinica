import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PatientAuthService } from 'src/app/shared/auth/patient-auth.service';

@Component({
  selector: 'app-patient-book',
  templateUrl: './patient-book.component.html',
  standalone: false,
})
export class PatientBookComponent implements OnInit, OnDestroy {

  step = 1; // 1=especialidad, 2=doctor, 3=fecha y hora, 4=confirmación

  steps = [
    { n: 1, label: 'Especialidad', icon: 'icon-tag' },
    { n: 2, label: 'Doctor',       icon: 'icon-user' },
    { n: 3, label: 'Horario',      icon: 'icon-calendar' },
    { n: 4, label: 'Pagar',        icon: 'icon-credit-card' },
  ];

  specialities: any[] = [];
  doctors: any[]      = [];
  schedule: any[]     = [];

  selectedSpeciality: any = null;
  selectedDoctor: any     = null;
  selectedDay: any        = null;
  selectedHour: any       = null;
  selectedDate: string    = '';

  paymentMethod: 'stripe' | 'billing' = 'billing';
  savedMethods: any[]       = [];
  selectedSavedMethod: any  = null;
  appointmentCreated    = false;
  appointmentId: number | null = null;
  confirmationMessage = '';

  // Stripe Embedded Checkout
  showStripeModal  = false;
  private stripeCheckout: any = null;

  loading    = false;
  loadingPay = false;
  error      = '';

  // Íconos rotativos para especialidades
  private specialityIcons = [
    'menu-icon-01.svg','menu-icon-02.svg','menu-icon-03.svg','menu-icon-04.svg',
    'menu-icon-05.svg','menu-icon-06.svg','menu-icon-07.svg','menu-icon-08.svg',
    'menu-icon-09.svg','menu-icon-10.svg','menu-icon-11.svg','menu-icon-12.svg',
    'menu-icon-13.svg','menu-icon-14.svg',
  ];

  // Días de la semana en español → número ISO
  private dayMap: any = {
    'Lunes': 1, 'Martes': 2, 'Miercoles': 3, 'Miércoles': 3,
    'Jueves': 4, 'Viernes': 5, 'Sabado': 6, 'Sábado': 6,
  };

  getSpecialityIcon(index: number): string {
    return 'assets/img/icons/' + this.specialityIcons[index % this.specialityIcons.length];
  }

  getInitials(name: string): string {
    return name ? name.split(' ').filter(Boolean).map((n: string) => n[0]).slice(0, 2).join('').toUpperCase() : '?';
  }

  constructor(private auth: PatientAuthService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.auth.bookingConfig().subscribe({
      next: (r: any) => {
        this.specialities = r.specialities || [];
        this.doctors      = r.doctors || [];
        this.loading      = false;
      },
      error: () => { this.loading = false; this.error = 'Error al cargar datos.'; },
    });
  }

  selectSpeciality(s: any) {
    this.selectedSpeciality = s;
    this.selectedDoctor = null;
    this.selectedDay    = null;
    this.selectedHour   = null;
    this.schedule       = [];
    this.step = 2;
  }

  selectDoctor(d: any) {
    this.selectedDoctor = d;
    this.selectedDay    = null;
    this.selectedHour   = null;
    this.schedule       = [];
    this.step = 3;
    this.auth.doctorSchedule(d.id).subscribe({
      next: (r: any) => { this.schedule = r.schedule || []; },
    });
  }

  selectDay(day: any) {
    this.selectedDay  = day;
    this.selectedHour = null;
    this.selectedDate = this.nextDateForDay(day.day);
  }

  selectHour(hour: any) {
    this.selectedHour = hour;
  }

  goToConfirm() {
    if (!this.selectedDay || !this.selectedHour) return;
    this.step = 4;
    // cargar métodos de pago guardados al llegar al paso 4
    this.auth.getPaymentMethods().subscribe({
      next: (r: any) => {
        this.savedMethods = r.data || [];
        const def = this.savedMethods.find((m: any) => m.is_default);
        if (def) { this.selectedSavedMethod = def; this.paymentMethod = 'billing'; }
      },
    });
  }

  pay() {
    this.loadingPay = true;
    this.error      = '';

    const payload = {
      method:                       this.paymentMethod,
      specialitie_id:               this.selectedSpeciality.id,
      doctor_id:                    this.selectedDoctor.id,
      doctor_schedule_join_hour_id: this.selectedHour.id,
      date_appointment:             this.selectedDate,
    };

    this.auth.createCheckout(payload).subscribe({
      next: (r: any) => {
        if (r.client_secret) {
          // Stripe Embedded — montar form en página
          this.mountStripeCheckout(r.publishable_key, r.client_secret);
        } else if (r.appointment_id) {
          // Billing → confirmación en página
          this.appointmentCreated  = true;
          this.appointmentId       = r.appointment_id;
          this.confirmationMessage = r.message || 'Cita registrada correctamente.';
          this.loadingPay = false;
        } else {
          this.error = 'Respuesta inesperada del servidor.';
          this.loadingPay = false;
        }
      },
      error: (err: any) => {
        this.error = err?.error?.message || 'Error al conectar con el servidor de pagos.';
        this.loadingPay = false;
      },
    });
  }

  private async mountStripeCheckout(publishableKey: string, clientSecret: string) {
    const stripe = await this.loadStripeJs(publishableKey);
    this.stripeCheckout = await stripe.initEmbeddedCheckout({ clientSecret });
    this.showStripeModal = true;
    this.loadingPay = false;
    // montar en el div después de que Angular renderice el modal
    setTimeout(() => this.stripeCheckout?.mount('#stripe-embedded-checkout'), 50);
  }

  closeStripeModal() {
    this.stripeCheckout?.destroy();
    this.stripeCheckout  = null;
    this.showStripeModal = false;
  }

  private loadStripeJs(publishableKey: string): Promise<any> {
    return new Promise((resolve) => {
      if ((window as any).Stripe) {
        resolve((window as any).Stripe(publishableKey));
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => resolve((window as any).Stripe(publishableKey));
      document.head.appendChild(script);
    });
  }

  ngOnDestroy() {
    this.stripeCheckout?.destroy();
  }

  cancel() {
    this.router.navigate(['/patient/dashboard']);
  }

  // Calcula la próxima fecha para el día de la semana dado
  private nextDateForDay(dayName: string): string {
    const target = this.dayMap[dayName] ?? 1;
    const today  = new Date();
    const current = today.getDay() === 0 ? 7 : today.getDay(); // ISO: 1=lun
    let diff = target - current;
    if (diff <= 0) diff += 7;
    const next = new Date(today);
    next.setDate(today.getDate() + diff);
    return next.toISOString().split('T')[0];
  }
}

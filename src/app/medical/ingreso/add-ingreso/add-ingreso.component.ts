import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { IngresoService } from '../service/ingreso.service';

@Component({
  selector: 'app-add-ingreso',
  templateUrl: './add-ingreso.component.html',
})
export class AddIngresoComponent implements OnInit {

  public routes = routes;

  // Datos del formulario
  public patient_id: any   = '';
  public doctor_id: any    = '';
  public fecha_ingreso     = '';
  public motivo            = '';
  public sala              = '';
  public cama              = '';
  public observaciones     = '';

  // Listas para los selectores
  public doctors:  any[] = [];
  public patients: any[] = [];

  // Feedback
  public text_success    = '';
  public text_validation = '';
  public loading         = false;

  constructor(
    private ingresoService: IngresoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.ingresoService.getConfig().subscribe((res: any) => {
      this.doctors  = res.doctors  ?? [];
      this.patients = res.patients ?? [];
    });
  }

  save(): void {
    this.text_validation = '';

    if (!this.patient_id || !this.doctor_id || !this.fecha_ingreso || !this.motivo) {
      this.text_validation = 'Completa los campos obligatorios: Paciente, Doctor, Fecha y Motivo.';
      return;
    }

    this.loading = true;
    const data = {
      patient_id:    this.patient_id,
      doctor_id:     this.doctor_id,
      fecha_ingreso: this.fecha_ingreso,
      motivo:        this.motivo,
      sala:          this.sala,
      cama:          this.cama,
      observaciones: this.observaciones,
    };

    this.ingresoService.registerIngreso(data).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/ingreso/list']);
      },
      error: (err) => {
        this.loading         = false;
        this.text_validation = err?.error?.message ?? 'Error al registrar el ingreso.';
      },
    });
  }
}

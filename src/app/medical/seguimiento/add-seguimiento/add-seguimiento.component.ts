import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { SeguimientoService } from '../service/seguimiento.service';

@Component({
  selector: 'app-add-seguimiento',
  templateUrl: './add-seguimiento.component.html',
})
export class AddSeguimientoComponent implements OnInit {

  public routes = routes;

  public patient_id          = '';
  public doctor_id           = '';
  public fecha_seguimiento   = '';
  public motivo              = '';
  public observaciones       = '';

  public doctors:  any[] = [];
  public patients: any[] = [];

  public text_success    = '';
  public text_validation = '';
  public loading         = false;

  constructor(
    private seguimientoService: SeguimientoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.seguimientoService.getConfig().subscribe((res: any) => {
      this.doctors  = res.doctors  ?? [];
      this.patients = res.patients ?? [];
    });
  }

  save(): void {
    this.text_validation = '';

    if (!this.patient_id || !this.doctor_id || !this.fecha_seguimiento || !this.motivo) {
      this.text_validation = 'Completa los campos obligatorios: Paciente, Doctor, Fecha y Motivo.';
      return;
    }

    this.loading = true;
    const data = {
      patient_id:        this.patient_id,
      doctor_id:         this.doctor_id,
      fecha_seguimiento: this.fecha_seguimiento,
      motivo:            this.motivo,
      observaciones:     this.observaciones,
    };

    this.seguimientoService.registerSeguimiento(data).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/seguimiento/list']);
      },
      error: (err) => {
        this.loading         = false;
        this.text_validation = err?.error?.message ?? 'Error al registrar.';
      },
    });
  }
}

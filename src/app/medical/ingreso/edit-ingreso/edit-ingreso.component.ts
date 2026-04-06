import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { IngresoService } from '../service/ingreso.service';

@Component({
  selector: 'app-edit-ingreso',
  templateUrl: './edit-ingreso.component.html',
})
export class EditIngresoComponent implements OnInit {

  public routes = routes;
  public ingreso_id: any = null;

  // Datos (pre-cargados)
  public patient_id: any   = '';
  public doctor_id: any    = '';
  public fecha_ingreso     = '';
  public motivo            = '';
  public sala              = '';
  public cama              = '';
  public observaciones     = '';
  public patient_name      = '';

  public doctors: any[] = [];

  public text_success    = '';
  public text_validation = '';
  public loading         = false;

  constructor(
    private ingresoService: IngresoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.ingreso_id = this.route.snapshot.paramMap.get('id');
    this.ingresoService.showIngreso(this.ingreso_id).subscribe((res: any) => {
      const i             = res.ingreso;
      this.patient_id     = i.patient_id;
      this.doctor_id      = i.doctor_id;
      this.fecha_ingreso  = i.fecha_ingreso?.replace(' ', 'T').substring(0, 16) ?? '';
      this.motivo         = i.motivo;
      this.sala           = i.sala ?? '';
      this.cama           = i.cama ?? '';
      this.observaciones  = i.observaciones ?? '';
      this.patient_name   = i.patient?.full_name ?? '';
    });

    this.ingresoService.getConfig().subscribe((res: any) => {
      this.doctors = res.doctors ?? [];
    });
  }

  save(): void {
    this.text_validation = '';

    if (!this.doctor_id || !this.fecha_ingreso || !this.motivo) {
      this.text_validation = 'Completa los campos obligatorios.';
      return;
    }

    this.loading = true;
    const data = {
      doctor_id:     this.doctor_id,
      fecha_ingreso: this.fecha_ingreso,
      motivo:        this.motivo,
      sala:          this.sala,
      cama:          this.cama,
      observaciones: this.observaciones,
    };

    this.ingresoService.updateIngreso(this.ingreso_id, data).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/ingreso/list']);
      },
      error: (err) => {
        this.loading         = false;
        this.text_validation = err?.error?.message ?? 'Error al actualizar.';
      },
    });
  }
}

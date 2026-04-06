import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { SeguimientoService } from '../service/seguimiento.service';

@Component({
  selector: 'app-edit-seguimiento',
  templateUrl: './edit-seguimiento.component.html',
})
export class EditSeguimientoComponent implements OnInit {

  public routes = routes;
  public seguimiento_id: any = null;

  public doctor_id           = '';
  public fecha_seguimiento   = '';
  public motivo              = '';
  public observaciones       = '';
  public estado: any         = 1;
  public patient_name        = '';

  public doctors: any[] = [];

  public estadosOptions = [
    { value: 1, label: 'Pendiente'  },
    { value: 2, label: 'Realizado'  },
    { value: 3, label: 'Cancelado'  },
  ];

  public text_validation = '';
  public loading         = false;

  constructor(
    private seguimientoService: SeguimientoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.seguimiento_id = this.route.snapshot.paramMap.get('id');
    this.seguimientoService.showSeguimiento(this.seguimiento_id).subscribe((res: any) => {
      const s                  = res.seguimiento;
      this.doctor_id           = s.doctor_id;
      this.fecha_seguimiento   = s.fecha_seguimiento;
      this.motivo              = s.motivo;
      this.observaciones       = s.observaciones ?? '';
      this.estado              = s.estado;
      this.patient_name        = s.patient?.full_name ?? '';
    });

    this.seguimientoService.getConfig().subscribe((res: any) => {
      this.doctors = res.doctors ?? [];
    });
  }

  save(): void {
    this.text_validation = '';

    if (!this.doctor_id || !this.fecha_seguimiento || !this.motivo || !this.estado) {
      this.text_validation = 'Completa los campos obligatorios.';
      return;
    }

    this.loading = true;
    const data = {
      doctor_id:         this.doctor_id,
      fecha_seguimiento: this.fecha_seguimiento,
      motivo:            this.motivo,
      observaciones:     this.observaciones,
      estado:            this.estado,
    };

    this.seguimientoService.updateSeguimiento(this.seguimiento_id, data).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/seguimiento/list']);
      },
      error: (err) => {
        this.loading         = false;
        this.text_validation = err?.error?.message ?? 'Error al actualizar.';
      },
    });
  }
}

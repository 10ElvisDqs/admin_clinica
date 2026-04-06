import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { EgresoService } from '../service/egreso.service';

@Component({
  selector: 'app-edit-egreso',
  templateUrl: './edit-egreso.component.html',
})
export class EditEgresoComponent implements OnInit {

  public routes = routes;
  public egreso_id: any = null;

  public fecha_egreso      = '';
  public tipo_egreso       = '';
  public diagnostico_final = '';
  public indicaciones      = '';
  public observaciones     = '';
  public patient_name      = '';
  public fecha_ingreso_ref = '';

  public tiposEgreso = [
    { value: 'alta_medica', label: 'Alta Médica' },
    { value: 'referido',    label: 'Referido'    },
    { value: 'voluntario',  label: 'Voluntario'  },
    { value: 'fallecido',   label: 'Fallecido'   },
  ];

  public text_validation = '';
  public loading         = false;

  constructor(
    private egresoService: EgresoService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.egreso_id = this.route.snapshot.paramMap.get('id');
    this.egresoService.showEgreso(this.egreso_id).subscribe((res: any) => {
      const e                = res.egreso;
      this.fecha_egreso      = e.fecha_egreso?.replace(' ', 'T').substring(0, 16) ?? '';
      this.tipo_egreso       = e.tipo_egreso;
      this.diagnostico_final = e.diagnostico_final;
      this.indicaciones      = e.indicaciones ?? '';
      this.observaciones     = e.observaciones ?? '';
      this.patient_name      = e.patient?.full_name ?? '';
      this.fecha_ingreso_ref = e.ingreso?.fecha_ingreso ?? '';
    });
  }

  save(): void {
    this.text_validation = '';

    if (!this.fecha_egreso || !this.tipo_egreso || !this.diagnostico_final) {
      this.text_validation = 'Completa los campos obligatorios.';
      return;
    }

    this.loading = true;
    const data = {
      fecha_egreso:      this.fecha_egreso,
      tipo_egreso:       this.tipo_egreso,
      diagnostico_final: this.diagnostico_final,
      indicaciones:      this.indicaciones,
      observaciones:     this.observaciones,
    };

    this.egresoService.updateEgreso(this.egreso_id, data).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/egreso/list']);
      },
      error: (err) => {
        this.loading         = false;
        this.text_validation = err?.error?.message ?? 'Error al actualizar.';
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { EgresoService } from '../service/egreso.service';

@Component({
  selector: 'app-add-egreso',
  templateUrl: './add-egreso.component.html',
})
export class AddEgresoComponent implements OnInit {

  public routes = routes;

  public ingreso_id: any  = '';
  public fecha_egreso      = '';
  public tipo_egreso       = '';
  public diagnostico_final = '';
  public indicaciones      = '';
  public observaciones     = '';

  public ingresos: any[] = [];

  public tiposEgreso = [
    { value: 'alta_medica', label: 'Alta Médica'  },
    { value: 'referido',    label: 'Referido'     },
    { value: 'voluntario',  label: 'Voluntario'   },
    { value: 'fallecido',   label: 'Fallecido'    },
  ];

  public text_success    = '';
  public text_validation = '';
  public loading         = false;

  constructor(
    private egresoService: EgresoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.egresoService.getConfig().subscribe((res: any) => {
      this.ingresos = res.ingresos ?? [];
    });
  }

  get ingresoSeleccionado(): any {
    return this.ingresos.find(i => i.id == this.ingreso_id) ?? null;
  }

  save(): void {
    this.text_validation = '';

    if (!this.ingreso_id || !this.fecha_egreso || !this.tipo_egreso || !this.diagnostico_final) {
      this.text_validation = 'Completa todos los campos obligatorios.';
      return;
    }

    this.loading = true;
    const data = {
      ingreso_id:        this.ingreso_id,
      fecha_egreso:      this.fecha_egreso,
      tipo_egreso:       this.tipo_egreso,
      diagnostico_final: this.diagnostico_final,
      indicaciones:      this.indicaciones,
      observaciones:     this.observaciones,
    };

    this.egresoService.registerEgreso(data).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/egreso/list']);
      },
      error: (err) => {
        this.loading         = false;
        this.text_validation = err?.error?.message ?? 'Error al registrar el egreso.';
      },
    });
  }
}

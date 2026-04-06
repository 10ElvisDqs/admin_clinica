import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { EgresoService } from '../service/egreso.service';

@Component({
  selector: 'app-list-egreso',
  templateUrl: './list-egreso.component.html',
})
export class ListEgresoComponent implements OnInit {

  public routes = routes;
  public egresoList: any[] = [];
  public total = 0;
  public currentPage = 1;
  public pageSize = 20;

  public searchDataValue = '';
  public tipoFiltro = '';

  public egreso_selected: any = null;
  public text_success = '';

  public tiposEgreso = [
    { value: 'alta_medica', label: 'Alta Médica' },
    { value: 'referido',    label: 'Referido'    },
    { value: 'voluntario',  label: 'Voluntario'  },
    { value: 'fallecido',   label: 'Fallecido'   },
  ];

  constructor(
    private egresoService: EgresoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData(): void {
    this.egresoService.listEgresos(this.currentPage, this.searchDataValue, this.tipoFiltro)
      .subscribe((res: any) => {
        this.total     = res.total;
        this.egresoList = res.egresos?.data ?? [];
      });
  }

  searchData(): void {
    this.currentPage = 1;
    this.getTableData();
  }

  clearFilters(): void {
    this.searchDataValue = '';
    this.tipoFiltro      = '';
    this.currentPage     = 1;
    this.getTableData();
  }

  getTipoLabel(tipo: string): string {
    return this.tiposEgreso.find(t => t.value === tipo)?.label ?? tipo;
  }

  selectEgreso(egreso: any): void {
    this.egreso_selected = egreso;
  }

  confirmDelete(): void {
    if (!this.egreso_selected) return;
    this.egresoService.deleteEgreso(this.egreso_selected.id).subscribe(() => {
      this.text_success = 'Egreso eliminado. El ingreso fue reactivado.';
      this.egresoList   = this.egresoList.filter(e => e.id !== this.egreso_selected.id);
      this.egreso_selected = null;
      setTimeout(() => this.text_success = '', 3000);
    });
  }

  generarPDF(): void {
    this.egresoService.generateReport(this.searchDataValue, this.tipoFiltro)
      .subscribe((blob: Blob) => {
        const file = new File([blob], 'reporte_egresos.pdf', { type: 'application/pdf' });
        const url  = URL.createObjectURL(file);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = 'reporte_egresos.pdf';
        a.click();
      });
  }

  get totalPages(): number {
    return Math.ceil(this.total / this.pageSize);
  }

  prevPage(): void {
    if (this.currentPage > 1) { this.currentPage--; this.getTableData(); }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) { this.currentPage++; this.getTableData(); }
  }
}

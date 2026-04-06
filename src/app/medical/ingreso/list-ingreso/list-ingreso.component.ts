import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { IngresoService } from '../service/ingreso.service';

@Component({
  selector: 'app-list-ingreso',
  templateUrl: './list-ingreso.component.html',
})
export class ListIngresoComponent implements OnInit {

  public routes = routes;
  public ingresoList: any[] = [];
  public total = 0;
  public currentPage = 1;
  public pageSize = 20;

  public searchDataValue = '';
  public estadoFiltro = '';

  public ingreso_selected: any = null;
  public text_success = '';

  constructor(
    private ingresoService: IngresoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData(): void {
    this.ingresoService.listIngresos(this.currentPage, this.searchDataValue, this.estadoFiltro)
      .subscribe((res: any) => {
        this.total       = res.total;
        this.ingresoList = res.ingresos?.data ?? [];
      });
  }

  searchData(): void {
    this.currentPage = 1;
    this.getTableData();
  }

  clearFilters(): void {
    this.searchDataValue = '';
    this.estadoFiltro    = '';
    this.currentPage     = 1;
    this.getTableData();
  }

  selectIngreso(ingreso: any): void {
    this.ingreso_selected = ingreso;
  }

  confirmDelete(): void {
    if (!this.ingreso_selected) return;
    this.ingresoService.deleteIngreso(this.ingreso_selected.id).subscribe(() => {
      this.text_success = 'Ingreso eliminado correctamente.';
      this.ingresoList  = this.ingresoList.filter(i => i.id !== this.ingreso_selected.id);
      this.ingreso_selected = null;
      setTimeout(() => this.text_success = '', 3000);
    });
  }

  generarPDF(): void {
    this.ingresoService.generateReport(this.searchDataValue, this.estadoFiltro)
      .subscribe((blob: Blob) => {
        const file = new File([blob], 'reporte_ingresos.pdf', { type: 'application/pdf' });
        const url  = URL.createObjectURL(file);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = 'reporte_ingresos.pdf';
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

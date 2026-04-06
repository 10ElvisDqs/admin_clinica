import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { SeguimientoService } from '../service/seguimiento.service';

@Component({
  selector: 'app-list-seguimiento',
  templateUrl: './list-seguimiento.component.html',
})
export class ListSeguimientoComponent implements OnInit {

  public routes = routes;
  public seguimientoList: any[] = [];
  public total = 0;
  public currentPage = 1;
  public pageSize = 20;

  public searchDataValue = '';
  public estadoFiltro = '';

  public seguimiento_selected: any = null;
  public text_success = '';

  constructor(
    private seguimientoService: SeguimientoService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData(): void {
    this.seguimientoService.listSeguimientos(this.currentPage, this.searchDataValue, this.estadoFiltro)
      .subscribe((res: any) => {
        this.total          = res.total;
        this.seguimientoList = res.seguimientos?.data ?? [];
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

  getEstadoBadge(estado: number): string {
    if (estado === 1) return 'bg-warning text-dark';
    if (estado === 2) return 'bg-success';
    return 'bg-danger';
  }

  getEstadoLabel(estado: number): string {
    if (estado === 1) return 'Pendiente';
    if (estado === 2) return 'Realizado';
    return 'Cancelado';
  }

  selectSeguimiento(s: any): void {
    this.seguimiento_selected = s;
  }

  confirmDelete(): void {
    if (!this.seguimiento_selected) return;
    this.seguimientoService.deleteSeguimiento(this.seguimiento_selected.id).subscribe(() => {
      this.text_success    = 'Seguimiento eliminado correctamente.';
      this.seguimientoList  = this.seguimientoList.filter(s => s.id !== this.seguimiento_selected.id);
      this.seguimiento_selected = null;
      setTimeout(() => this.text_success = '', 3000);
    });
  }

  generarPDF(): void {
    this.seguimientoService.generateReport(this.searchDataValue, this.estadoFiltro)
      .subscribe((blob: Blob) => {
        const file = new File([blob], 'reporte_seguimientos.pdf', { type: 'application/pdf' });
        const url  = URL.createObjectURL(file);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = 'reporte_seguimientos.pdf';
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

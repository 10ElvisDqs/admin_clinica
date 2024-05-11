import { Component } from '@angular/core';
import { SpecialitieService } from '../service/specialitie.service';
import { MatTableDataSource } from '@angular/material/table';

declare var $:any;

@Component({
  selector: 'app-list-specialitie',
  templateUrl: './list-specialitie.component.html',
  styleUrls: ['./list-specialitie.component.scss']
})
export class ListSpecialitieComponent {
  public specialitiesList:any = [];
  dataSource!: MatTableDataSource<any>;

  public showFilter = false;
  public searchDataValue = '';
  public lastIndex = 0;
  public pageSize = 10;
  public totalData = 0;
  public skip = 0;//MIN
  public limit: number = this.pageSize;//MAX
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<any> = [];
  public totalPages = 0;

  public specialitie_generals:any = [];
  public specialitie_selected:any;
  constructor(
    public specialitiesService: SpecialitieService,
  ){

  }
  ngOnInit() {
    this.getTableData();
  }
  private getTableData(): void {
    this.specialitiesList = [];
    this.serialNumberArray = [];

    this.specialitiesService.listSpecialities().subscribe((resp:any) => {

      console.log(resp);

      this.totalData = resp.specialities.length;
      this.specialitie_generals = resp.specialities;
      this.getTableDataGeneral();
    })


  }

  getTableDataGeneral() {
    this.specialitiesList = [];
    this.serialNumberArray = [];

    this.specialitie_generals.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {

        this.specialitiesList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.specialitiesList);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  selectSpecialitie(rol:any){
    this.specialitie_selected = rol;
  }

  deleteSpecialitie(){

    this.specialitiesService.deleteSpecialities(this.specialitie_selected.id).subscribe((resp:any) => {
      console.log(resp);
      let INDEX = this.specialitiesList.findIndex((item:any) => item.id == this.specialitie_selected.id);
      if(INDEX != -1){
        this.specialitiesList.splice(INDEX,1);

        $('#delete_patient').hide();
        $("#delete_patient").removeClass("show");
        $(".modal-backdrop").remove();
        $("body").removeClass();
        $("body").removeAttr("style");

        this.specialitie_selected = null;
      }
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData(value: any): void {
    this.dataSource.filter = value.trim().toLowerCase();
    this.specialitiesList = this.dataSource.filteredData;
  }

  public sortData(sort: any) {
    const data = this.specialitiesList.slice();

    if (!sort.active || sort.direction === '') {
      this.specialitiesList = data;
    } else {
      this.specialitiesList = data.sort((a:any, b:any) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }

  public getMoreData(event: string): void {
    if (event == 'next') {
      this.currentPage++;
      this.pageIndex = this.currentPage - 1;
      this.limit += this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneral();
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableDataGeneral();
    }
  }

  public moveToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.skip = this.pageSelection[pageNumber - 1].skip;
    this.limit = this.pageSelection[pageNumber - 1].limit;
    if (pageNumber > this.currentPage) {
      this.pageIndex = pageNumber - 1;
    } else if (pageNumber < this.currentPage) {
      this.pageIndex = pageNumber + 1;
    }
    this.getTableDataGeneral();
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.searchDataValue = '';
    this.getTableDataGeneral();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);
    }
    /* eslint no-var: off */
    for (var i = 1; i <= this.totalPages; i++) {
      const limit = pageSize * i;
      const skip = limit - pageSize;
      this.pageNumberArray.push(i);
      this.pageSelection.push({ skip: skip, limit: limit });
      // 1
      // 0 - 10
      // 2
      // 10 - 20
    }
  }
}

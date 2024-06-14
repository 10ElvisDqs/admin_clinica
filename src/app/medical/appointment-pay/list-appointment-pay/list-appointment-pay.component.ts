import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AppointmentPayService } from '../service/appointment-pay.service';
declare var $:any;
@Component({
  selector: 'app-list-appointment-pay',
  templateUrl: './list-appointment-pay.component.html',
  styleUrls: ['./list-appointment-pay.component.scss']
})
export class ListAppointmentPayComponent {

  public searchDataValue:string = '';
  public searchDataDoctor:string = '';
  public selectedValue:string = '';
  public specialities:any  = [];
  public date_start:any;
  public date_end:any;

  public appointmentList:any = [];
  dataSource!: MatTableDataSource<any>;

  public showFilter = false;
  public specialitie_id = '';
  public date = null;
  public lastIndex = 0;
  public pageSize = 20;
  public totalData = 0;
  public skip = 0;//MIN
  public limit: number = this.pageSize;//MAX
  public pageIndex = 0;
  public serialNumberArray: Array<number> = [];
  public currentPage = 1;
  public pageNumberArray: Array<number> = [];
  public pageSelection: Array<any> = [];
  public totalPages = 0;

  public patient_generals:any = [];
  public appointment_selected:any;

  public method_payment:string = '';
  public amount_add:number = 0;
  public text_success:string = '';
  public text_validation:string = '';

  public payment_selected:any;
  constructor(
    public appointmentPayService: AppointmentPayService,
  ){

  }
  ngOnInit() {
    this.getTableData();

    this.appointmentPayService.listConfig().subscribe((resp:any) => {
      this.specialities = resp.specialities;
    })
  }
  private getTableData(page=1): void {
    this.appointmentList = [];
    this.serialNumberArray = [];

    this.appointmentPayService.listAppointmentPays(page,this.searchDataDoctor,this.searchDataValue,this.specialitie_id,this.date_start,this.date_end).subscribe((resp:any) => {

      console.log(resp);

      this.totalData = resp.total;
      this.appointmentList = resp.appointments.data;
      // this.getTableDataGeneral();
      this.dataSource = new MatTableDataSource<any>(this.appointmentList);
      this.calculateTotalPages(this.totalData, this.pageSize);
    })


  }

  getTableDataGeneral() {
    this.appointmentList = [];
    this.serialNumberArray = [];

    this.patient_generals.map((res: any, index: number) => {
      const serialNumber = index + 1;
      if (index >= this.skip && serialNumber <= this.limit) {

        this.appointmentList.push(res);
        this.serialNumberArray.push(serialNumber);
      }
    });
    this.dataSource = new MatTableDataSource<any>(this.appointmentList);
    this.calculateTotalPages(this.totalData, this.pageSize);
  }

  selectUser(rol:any){
    this.appointment_selected = rol;
  }
  clearData(){
    this.amount_add = 0;
    this.method_payment = '';
    this.text_validation = '';
    this.text_success = '';
  }
  selectEditPayment(payment:any){
    this.payment_selected = payment;
    this.text_validation = '';
    this.text_success = '';
    this.amount_add = this.payment_selected.amount;
    this.method_payment = this.payment_selected.method_payment;
  }

  addPayment(data:any){
    this.text_validation = '';
    if(!this.method_payment || !this.amount_add){
      this.text_validation = 'NECESITAS INGRESAR TODOS LOS CAMPOS ESTE FORMULARIO';
      return;
    }

    let dataD = {
      appointment_id: data.id,
      appointment_total: data.amount,
      amount: this.amount_add,
      method_payment: this.method_payment,
    }

    this.appointmentPayService.registerAppointmentPay(dataD).subscribe((resp:any) => {
      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{
        this.text_success = "EL PAGO SE REGISTRO CORRECTAMENTE";
        data.payments.push(resp.appointment_pay);

        let INDEX = this.appointmentList.findIndex((appo:any) => appo.id == data.id);
        if(INDEX != -1){
          this.appointmentList[INDEX].status_pay = !resp.appointment_pay.is_total_payment ? 2 : 1;
        }
        this.amount_add = 0;
        this.method_payment = '';
      }
    })
  }
  editPayment(data:any){
    this.text_validation = '';
    if(!this.method_payment || !this.amount_add){
      this.text_validation = 'NECESITAS INGRESAR TODOS LOS CAMPOS ESTE FORMULARIO';
      return;
    }

    let dataD = {
      appointment_id: data.id,
      appointment_total: data.amount,
      amount: this.amount_add,
      method_payment: this.method_payment,
    }

    this.appointmentPayService.updateAppointmentPay(this.payment_selected.id,dataD).subscribe((resp:any) => {
      if(resp.message == 403){
        this.text_validation = resp.message_text;
      }else{
        this.text_success = "EL PAGO SE EDITO CORRECTAMENTE";
        let index = data.payments.findIndex((pay:any) => pay.id == resp.appointment_pay.id);
        if(index != -1){
          data.payments[index] = resp.appointment_pay;
        }

        let INDEX = this.appointmentList.findIndex((appo:any) => appo.id == data.id);
        if(INDEX != -1){
          this.appointmentList[INDEX].status_pay = !resp.appointment_pay.is_total_payment ? 2 : 1;
        }

        this.amount_add = 0;
        this.method_payment = '';
      }
    })
  }

  deleteAppointmentPay(data:any){

    this.appointmentPayService.deleteAppointmentPay(this.payment_selected.id).subscribe((resp:any) => {
      console.log(resp);
      let INDEX = data.payments.findIndex((item:any) => item.id == this.payment_selected.id);

      let INDEX2 = this.appointmentList.findIndex((appo:any) => appo.id == data.id);
      if(INDEX2 != -1){
        this.appointmentList[INDEX2].status_pay = 2;
      }

      if(INDEX != -1){
        data.payments.splice(INDEX,1);

        $('#delete_patient').hide();
        $("#delete_patient").removeClass("show");
        $(".modal-backdrop").remove();
        $("body").removeClass();
        $("body").removeAttr("style");

        this.payment_selected = null;
      }
    })
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public searchData() {
    // this.dataSource.filter = value.trim().toLowerCase();
    // this.appointmentList = this.dataSource.filteredData;
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;

    this.getTableData();
  }

  public sortData(sort: any) {
    const data = this.appointmentList.slice();

    if (!sort.active || sort.direction === '') {
      this.appointmentList = data;
    } else {
      this.appointmentList = data.sort((a:any, b:any) => {
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
      this.getTableData(this.currentPage);
    } else if (event == 'previous') {
      this.currentPage--;
      this.pageIndex = this.currentPage - 1;
      this.limit -= this.pageSize;
      this.skip = this.pageSize * this.pageIndex;
      this.getTableData(this.currentPage);
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
    this.getTableData(this.currentPage);
  }

  public PageSize(): void {
    this.pageSelection = [];
    this.limit = this.pageSize;
    this.skip = 0;
    this.currentPage = 1;
    this.searchDataValue = '';
    this.specialitie_id = '';
    this.date = null;
    this.getTableData();
  }

  private calculateTotalPages(totalData: number, pageSize: number): void {
    this.pageNumberArray = [];
    this.totalPages = totalData / pageSize;
    if (this.totalPages % 1 != 0) {
      this.totalPages = Math.trunc(this.totalPages + 1);//10.6 o 10.9 11
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
      // 3
      // 20 - 30
    }
  }

  filter(){

  }
}

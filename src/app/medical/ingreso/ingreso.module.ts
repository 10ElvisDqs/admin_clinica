import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IngresoRoutingModule } from './ingreso-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListIngresoComponent } from './list-ingreso/list-ingreso.component';
import { AddIngresoComponent }  from './add-ingreso/add-ingreso.component';
import { EditIngresoComponent } from './edit-ingreso/edit-ingreso.component';

@NgModule({
  declarations: [
    ListIngresoComponent,
    AddIngresoComponent,
    EditIngresoComponent,
  ],
  imports: [
    CommonModule,
    IngresoRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class IngresoModule {}

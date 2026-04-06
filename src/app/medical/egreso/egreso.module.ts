import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EgresoRoutingModule } from './egreso-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListEgresoComponent } from './list-egreso/list-egreso.component';
import { AddEgresoComponent }  from './add-egreso/add-egreso.component';
import { EditEgresoComponent } from './edit-egreso/edit-egreso.component';

@NgModule({
  declarations: [
    ListEgresoComponent,
    AddEgresoComponent,
    EditEgresoComponent,
  ],
  imports: [
    CommonModule,
    EgresoRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class EgresoModule {}

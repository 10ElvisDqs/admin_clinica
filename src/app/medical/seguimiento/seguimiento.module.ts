import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SeguimientoRoutingModule } from './seguimiento-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListSeguimientoComponent } from './list-seguimiento/list-seguimiento.component';
import { AddSeguimientoComponent }  from './add-seguimiento/add-seguimiento.component';
import { EditSeguimientoComponent } from './edit-seguimiento/edit-seguimiento.component';

@NgModule({
  declarations: [
    ListSeguimientoComponent,
    AddSeguimientoComponent,
    EditSeguimientoComponent,
  ],
  imports: [
    CommonModule,
    SeguimientoRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class SeguimientoModule {}

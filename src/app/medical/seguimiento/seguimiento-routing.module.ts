import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSeguimientoComponent } from './list-seguimiento/list-seguimiento.component';
import { AddSeguimientoComponent }  from './add-seguimiento/add-seguimiento.component';
import { EditSeguimientoComponent } from './edit-seguimiento/edit-seguimiento.component';

const routes: Routes = [
  { path: 'list',       component: ListSeguimientoComponent },
  { path: 'register',   component: AddSeguimientoComponent  },
  { path: 'edit/:id',   component: EditSeguimientoComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguimientoRoutingModule {}

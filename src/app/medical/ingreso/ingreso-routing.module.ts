import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListIngresoComponent } from './list-ingreso/list-ingreso.component';
import { AddIngresoComponent }  from './add-ingreso/add-ingreso.component';
import { EditIngresoComponent } from './edit-ingreso/edit-ingreso.component';

const routes: Routes = [
  { path: 'list',       component: ListIngresoComponent },
  { path: 'register',   component: AddIngresoComponent  },
  { path: 'edit/:id',   component: EditIngresoComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IngresoRoutingModule {}

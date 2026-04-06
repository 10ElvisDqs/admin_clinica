import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEgresoComponent } from './list-egreso/list-egreso.component';
import { AddEgresoComponent }  from './add-egreso/add-egreso.component';
import { EditEgresoComponent } from './edit-egreso/edit-egreso.component';

const routes: Routes = [
  { path: 'list',       component: ListEgresoComponent },
  { path: 'register',   component: AddEgresoComponent  },
  { path: 'edit/:id',   component: EditEgresoComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EgresoRoutingModule {}

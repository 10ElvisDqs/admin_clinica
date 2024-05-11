import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpecialitieComponent } from './specialitie.component';
import { AddSpecialitieComponent } from './add-specialitie/add-specialitie.component';
import { ListSpecialitieComponent } from './list-specialitie/list-specialitie.component';
import { EditSpecialitieComponent } from './edit-specialitie/edit-specialitie.component';

const routes: Routes = [{
  path:'',
  component: SpecialitieComponent,
  children:[
    {
      path: 'register',
      component: AddSpecialitieComponent
    },
    {
      path: 'list',
      component: ListSpecialitieComponent
    },
    {
      path: 'list/edit/:id',
      component: EditSpecialitieComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialitieRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StaffComponent } from './staff.component';
import { AddStaffNComponent } from './add-staff-n/add-staff-n.component';
import { ListStaffNComponent } from './list-staff-n/list-staff-n.component';
import { EditStaffNComponent } from './edit-staff-n/edit-staff-n.component';

const routes: Routes = [{
  path:'',
  component:StaffComponent,
  children:[
    {
      path:'add-staff',
      component:AddStaffNComponent
    },
    {
      path:'list-staff',
      component:ListStaffNComponent
    },
    {
      path:'list-staff/edit-staff/:id',
      component:EditStaffNComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { AddRoleUserComponent } from './add-role-user/add-role-user.component';
import { EditRoleUserComponent } from './edit-role-user/edit-role-user.component';
import { ListRoleUserComponent } from './list-role-user/list-role-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    RolesComponent,
    AddRoleUserComponent,
    EditRoleUserComponent,
    ListRoleUserComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    //
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class RolesModule { }

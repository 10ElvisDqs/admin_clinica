import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialitieRoutingModule } from './specialitie-routing.module';
import { SpecialitieComponent } from './specialitie.component';
import { AddSpecialitieComponent } from './add-specialitie/add-specialitie.component';
import { EditSpecialitieComponent } from './edit-specialitie/edit-specialitie.component';
import { ListSpecialitieComponent } from './list-specialitie/list-specialitie.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SpecialitieComponent,
    AddSpecialitieComponent,
    EditSpecialitieComponent,
    ListSpecialitieComponent
  ],
  imports: [
    CommonModule,
    SpecialitieRoutingModule,
    // 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ]
})
export class SpecialitieModule { }

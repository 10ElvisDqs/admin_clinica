import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { SharedModule } from '../shared/shared.module';
import { ModalComponent } from './modal/modal.component';
// import { HeaderComponent } from '../common-component/header/header.component';
// import { SidebarComponent } from '../common-component/sidebar/sidebar.component';


@NgModule({
  declarations: [
    CoreComponent,
    // HeaderComponent,
    // SidebarComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule
  ],
})
export class CoreModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
// import { HeaderComponent } from  './common-component/header/header.component';
// import { SidebarComponent } from './common-component/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent,
    // SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[
    // HeaderComponent,
    // SidebarComponent

  ]
})
export class AppModule { }

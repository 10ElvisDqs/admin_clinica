import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { LandingRoutingModule } from './landing-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [LandingComponent],
  imports: [CommonModule, RouterModule, LandingRoutingModule, HttpClientModule],
})
export class LandingModule {}

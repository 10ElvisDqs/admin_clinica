import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientGuard } from '../shared/gaurd/patient.guard';
import { PatientShellComponent } from './patient-shell/patient-shell.component';

const routes: Routes = [
  // Rutas públicas (login / register) — sin shell
  {
    path: 'patient/login',
    loadChildren: () => import('./patient-login/patient-login.module').then(m => m.PatientLoginModule),
  },
  {
    path: 'patient/register',
    loadChildren: () => import('./patient-register/patient-register.module').then(m => m.PatientRegisterModule),
  },
  // Portal protegido — dentro del shell
  {
    path: 'patient',
    component: PatientShellComponent,
    canActivate: [PatientGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./patient-dashboard/patient-dashboard.module').then(m => m.PatientDashboardModule),
      },
      {
        path: 'book',
        loadChildren: () => import('./patient-book/patient-book.module').then(m => m.PatientBookModule),
      },
      {
        path: 'payment-methods',
        loadChildren: () => import('./patient-payment-methods/patient-payment-methods.module').then(m => m.PatientPaymentMethodsModule),
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}

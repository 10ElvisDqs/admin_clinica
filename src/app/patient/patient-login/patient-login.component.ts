import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientAuthService } from 'src/app/shared/auth/patient-auth.service';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.scss'],
  standalone: false,
})
export class PatientLoginComponent {
  showPassword = false;
  loading      = false;
  errorMsg     = '';

  form = new FormGroup({
    email:    new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  get f() { return this.form.controls; }

  constructor(private auth: PatientAuthService, private router: Router) {}

  submit() {
    if (this.form.invalid) return;
    this.loading  = true;
    this.errorMsg = '';
    const { email, password } = this.form.value;
    this.auth.login(email!, password!).subscribe((resp: any) => {
      this.loading = false;
      if (resp.ok) {
        this.router.navigate(['/patient/dashboard']);
      } else {
        this.errorMsg = resp.message || 'Error al iniciar sesión.';
      }
    });
  }
}

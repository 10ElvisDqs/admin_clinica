import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientAuthService } from 'src/app/shared/auth/patient-auth.service';

@Component({
  selector: 'app-patient-register',
  templateUrl: './patient-register.component.html',
  styleUrls: ['./patient-register.component.scss'],
  standalone: false,
})
export class PatientRegisterComponent {
  showPassword = false;
  loading      = false;
  errorMsg     = '';
  successMsg   = '';

  form = new FormGroup({
    name:       new FormControl('', [Validators.required]),
    surname:    new FormControl('', [Validators.required]),
    n_document: new FormControl('', [Validators.required]),
    email:      new FormControl('', [Validators.required, Validators.email]),
    mobile:     new FormControl(''),
    birth_date: new FormControl(''),
    gender:     new FormControl(''),
    address:    new FormControl(''),
    password:   new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get f() { return this.form.controls; }

  constructor(private auth: PatientAuthService, private router: Router) {}

  submit() {
    if (this.form.invalid) return;
    this.loading    = true;
    this.errorMsg   = '';
    this.successMsg = '';

    this.auth.register(this.form.value).subscribe((resp: any) => {
      this.loading = false;
      if (resp.message === 200) {
        this.successMsg = resp.message_text || 'Registro exitoso.';
        setTimeout(() => this.router.navigate(['/patient/login']), 2000);
      } else {
        this.errorMsg = resp.message_text || (resp.errors ? JSON.stringify(resp.errors) : 'Error al registrarse.');
      }
    });
  }
}

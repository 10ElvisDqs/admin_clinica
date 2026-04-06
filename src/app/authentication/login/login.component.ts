import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent implements OnInit {
  public routes = routes;
  public passwordClass = false;
  public ERROR = false;
  form = new FormGroup({
    email: new FormControl('dquinteros630@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('12345678', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(public auth: AuthService, public router: Router) {}
  ngOnInit(): void {
    if (localStorage.getItem('authenticated')) {
      // localStorage.removeItem('authenticated');
      this.router.navigate([routes.adminDashboard]);
    }
  }

  loginFormSubmit() {
    if (this.form.valid) {
      this.ERROR = false;
      this.auth
        .login(
          this.form.value.email ? this.form.value.email : '',
          this.form.value.password ? this.form.value.password : ''
        )
        .subscribe(
          (resp: any) => {
            console.log(resp);
            if (resp) {
              // EL LOGIN ES EXITOSO
              setTimeout(() => {
                document.location.reload();
              }, 50);
            } else {
              // EL LOGIN NO ES EXITOSO
              this.ERROR = true;
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
  togglePassword() {
    this.passwordClass = !this.passwordClass;
  }
}

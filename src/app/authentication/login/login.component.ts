import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public routes = routes;
  public passwordClass = false;
  public ERROR:boolean = false;

  form = new FormGroup({
    email: new FormControl('dquinteros630@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('1qazxsw2', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(
    public auth: AuthService,
    public router:Router,
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('authenticated')) {
      localStorage.removeItem('authenticated');
    }
  }

  loginFormSubmit() {
    if (this.form.valid) {
      this.ERROR = false;
      this.auth.login(this.form.value.email?this.form.value.email:'' , this.form.value.password? this.form.value.password:'')
      .subscribe((resp:any) => {
        console.log(resp);
        if(resp){
          // El Login es Exitoso
          this.router.navigate([routes.adminDashboard]);
        }else{
          // El Login no es Exitos
          this.ERROR = true;
        }
      },error =>{
        console.log(error);
      })
      ;
    }
  }
  togglePassword() {
    this.passwordClass = !this.passwordClass;
  }
}

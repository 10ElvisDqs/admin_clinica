import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  standalone: false,
})
export class LandingComponent implements OnInit {
  doctors: any[]      = [];
  specialities: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>(`${URL_SERVICIOS}/public/doctors`).subscribe(r => this.doctors = r.doctors || []);
    this.http.get<any>(`${URL_SERVICIOS}/public/specialities`).subscribe(r => this.specialities = r.specialities || []);
  }

  getInitials(name: string): string {
    return name ? name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() : 'DR';
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-order-list',
  standalone: false,

  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {
  license_plate: any;
  carList: any[] = []
  baseUrl: string = 'http://localhost:8000/api'

  isLoad: boolean = false;

  selectedCar: any;

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  })

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoad = true;
    this.getData()
  }

  getData() {
    //
    this.http.get(this.baseUrl + '/rentals/user').subscribe((res: any) => {
      console.log(res)
      this.carList = res.rentals
      this.isLoad = false;
    }, err => {
      this.isLoad = false;
    })
  }

  onSelect(item: any) {
    this.selectedCar = item;
    this.license_plate = item.license_plate
  }

  returnRental() {
    this.http.post(this.baseUrl + '/returns', { "car_plate": this.license_plate }, {
      headers: this.headers,
      withCredentials: true
    }).subscribe(res => {
      console.log(res);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Mobil Berhasil dikembalikan",
        showConfirmButton: false,
        timer: 1500
      });
      this.getData()
    }, err => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.error.message,
      });
    })
  }

  logout() {
    this.http.post(this.baseUrl + '/logout', {}).subscribe(res => {
      console.log(res)
      this.router.navigate(['/login'])
    })
  }
}

import { NgClass } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home',
  imports: [
    FormsModule, ReactiveFormsModule, RouterLink, NgClass
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  carList: any[] = []
  idModal: any = '';
  selectedOrder: any;
  totalPrice: any;
  totalDays: any;

  startDate: any;
  endDate: any;

  selectType: any;
  inputText: any;

  baseUrl: string = 'http://localhost:8000/api'

  isAvail: boolean = false;
  availibility: any;

  isLoad: boolean = false;

  contentHeader = new HttpHeaders({ "Content-Type": "application/json" });

  newCar: any = {
    "brand": '',
    "model": '',
    "license_plate": '',
    "price_per_day": '',
    "is_available": ''
  }

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.isLoad = true;
    this.getCars()
  }

  getCars() {
    this.http.get(this.baseUrl + '/cars', { headers: this.contentHeader }).subscribe(
      (res: any) => {
        this.carList = res?.data
        console.log(this.carList)
        this.isLoad = false;
      },
      err => {
        this.isLoad = false;
      }
    )
  }

  order(item: any) {
    console.log(item)
    this.selectedOrder = item;
  }

  doOrder(item: any) {
    //
    this.http.post(this.baseUrl + '/rentals', {
      "car_id": this.selectedOrder.id,
      "start_date": new Date(this.startDate),
      "end_date": new Date(this.endDate),
      "total_cost": this.totalPrice
    }
    ).subscribe((res: any) => {
      console.log(res)
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1500
      });
    }, err => {
      console.log(err.error.message)
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.error.message,
      });
    })
  }

  calculate(start: any, end: any) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const result = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Menghitung jumlah hari
    const price = Number(this.selectedOrder.rental_price_per_day)
    if (!Number.isNaN(result)) {
      this.totalPrice = result * price
      this.totalDays = result
      console.log(this.totalPrice)
    }

  }

  closeModal() {
    this.totalDays = null;
    this.totalPrice = null;
    this.startDate = null;
    this.endDate = null;
  }

  search() {
    let url = this.baseUrl + '/cars/search?'
    switch (this.selectType) {
      case 'brand':
        url = url + 'brand=' + this.inputText
        break;

      case 'model':
        url = url + 'model=' + this.inputText
        break;

      case 'avail':
        url = url + 'available=' + this.availibility
        break;

      default:
        break;
    }

    this.http.get(url).subscribe((res: any) => {
      console.log(res)
      this.carList = res.data
    })


  }

  getValueCheck(event: Event) {
    console.log((event.target as HTMLInputElement).checked)
    this.newCar.is_available = (event.target as HTMLInputElement).checked
  }

  onAddNewCar(item: any) {
    console.log(item)
    item = {
      ...item,
      "rental_price_per_day": item.price_per_day
    }
    this.http.post(this.baseUrl + '/cars/add', item).subscribe(res => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Mobil Berhasil ditambahkan",
        showConfirmButton: false,
        timer: 1500
      });
    }, err => {
      console.log(err.error.message)
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

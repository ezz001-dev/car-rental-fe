import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    FormsModule, ReactiveFormsModule
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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get(this.baseUrl + '/cars').subscribe(
      (res: any) => {
        this.carList = res?.data
        console.log(this.carList)
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
      "user_id": "1",
      "start_date": new Date(this.startDate),
      "end_date": new Date(this.endDate),
    }
    ).subscribe(res => {
      console.log(res)
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

}

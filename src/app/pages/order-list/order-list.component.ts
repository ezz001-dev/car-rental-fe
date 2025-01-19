import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  standalone: false,

  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent implements OnInit {
  carList: any[] = []
  baseUrl: string = 'http://localhost:8000/api'
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    //
    this.http.get(this.baseUrl + '/rentals/user').subscribe(res => {
      console.log(res)
    })
  }
}

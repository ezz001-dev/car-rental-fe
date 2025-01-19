import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-history-rent',
  standalone: false,

  templateUrl: './history-rent.component.html',
  styleUrl: './history-rent.component.scss'
})
export class HistoryRentComponent implements OnInit {

  baseUrl: string = 'http://localhost:8000/api'
  carList: any[] = []
  license_plate: any;

  isLoad: boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.isLoad = true;
    this.getData()
  }

  getData() {
    this.http.get(this.baseUrl + '/returns/user').subscribe((res: any) => {
      console.log(res)
      this.carList = res.returns
      this.isLoad = false;
    },
      err => {
        this.isLoad = false;
        console.log(err)
      })
  }

  logout() {
    this.http.post(this.baseUrl + '/logout', {}).subscribe(res => {
      console.log(res)
      this.router.navigate(['/login'])
    })
  }
}

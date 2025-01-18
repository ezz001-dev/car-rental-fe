import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  user = {
    name: '',
    email: '',
    password: '',
    address: '',
    phone_number: '',
    sim_number: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    this.http.post('http://localhost:8000/api/register', this.user).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed', error);
      }
    );
  }

  // name = '';
  // email = '';
  // password = '';

  // onRegister() {
  //   const payload = { name: this.name, email: this.email, password: this.password };
  //   console.log('Register Payload:', payload);
  //   // Tambahkan logika panggilan API ke backend menggunakan service
  // }
}

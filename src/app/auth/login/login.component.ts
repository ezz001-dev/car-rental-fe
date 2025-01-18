import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    this.http.post('http://localhost:8000/api/login', this.user).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        localStorage.setItem('access_token', response.access_token);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}

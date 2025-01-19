import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderListComponent } from './order-list/order-list.component';



@NgModule({
  declarations: [
    PagesComponent,
    OrderListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'pages/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent }
    ])
  ]
})
export class PagesModule { }

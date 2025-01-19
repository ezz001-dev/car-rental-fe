import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderListComponent } from './order-list/order-list.component';
import { HeaderComponent } from '../layouts/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HistoryRentComponent } from './history-rent/history-rent.component';




@NgModule({
  declarations: [
    PagesComponent,
    OrderListComponent,
    HistoryRentComponent,
  ],
  imports: [
    CommonModule,
    HeaderComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'pages/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'order-list', component: OrderListComponent },
      { path: 'rent-history', component: HistoryRentComponent }
    ])
  ]
})
export class PagesModule { }

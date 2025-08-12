import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CustomerService } from '../login/customerservice';

@Component({
  selector: 'app-innernavbar',
  standalone: true,
  imports: [RouterLink,FormsModule, RouterLinkActive, ReactiveFormsModule,CommonModule, HttpClientModule],
  templateUrl: './innernavbar.component.html',
  styleUrl: './innernavbar.component.css'
})
export class InnernavbarComponent {

  constructor(private router: Router,private customerService: CustomerService) {}

  onLogout(){
    this.customerService.removeAccountNumber();
    this.customerService.removeCustomerId();
    this.customerService.removeCustomerName();
    this.customerService.removePaymentAmount();
    this.customerService.removePaymentId();
    this.router.navigate(["login"]);
  }
}

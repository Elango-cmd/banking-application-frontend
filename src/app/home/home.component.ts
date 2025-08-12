import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  title = 'EVILAN BANK';

constructor(private router:Router){}
  openAccount(): void {
    console.log('Redirecting to open an account...');
    this.router.navigate(["bankingaccount"]);
  }

  applyForLoan(): void {
    console.log('Redirecting to loan application...');
    this.router.navigate(["bankingaccount"]);
  }

  haveAccount(): void {
    console.log('Redirecting to account information page...');
    this.router.navigate(["accountinfo"]);
    // Implement the actual navigation or API call here
  }
}

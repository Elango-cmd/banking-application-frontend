import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-customersupport',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './customersupport.component.html',
  styleUrl: './customersupport.component.css'
})
export class CustomersupportComponent {

  phoneNumber= '1-800-123-4567';
  emailId= 'support@evilanbank.com';

  constructor(private router: Router) { }

  // ngOnInit(): void {
  //   // Initialization logic if needed
  // }

  contactSupport(): void {
    console.log('Redirecting to support contact form...');
    this.router.navigate(['/contact']);
  }

  startLiveChat(): void {
    console.log('Starting live chat...');
    this.router.navigate(['/live']);
  }
}

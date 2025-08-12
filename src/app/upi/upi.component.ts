import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../login/customerservice';

@Component({
  selector: 'app-upi',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule, HttpClientModule],
  templateUrl: './upi.component.html',
  styleUrl: './upi.component.css'
})
export class UpiComponent {
  upiForm: FormGroup;
  transactionMessage: string = '';

  constructor(private http: HttpClient,private customerService: CustomerService,private fb: FormBuilder,private router: Router) {
    const paymentIdAmount= this.customerService.getPaymentAmount;
    this.upiForm = this.fb.group({
      upiId: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@upi$')]),  
      paymentAmount: new FormControl(paymentIdAmount, [Validators.required, Validators.min(1)]), 
    });
  }

  onSubmit() {
    const paymentIdKey= this.customerService.getPaymentId;
    if(this.upiForm.valid){
    this.http.put('http://localhost:9090/api/v1/customerBankingPayment/paymentDetail', paymentIdKey)
    .subscribe((res: any) => {
      if (res) {
        this.transactionMessage = 'Transaction Successful!.';
        alert("welcome again "+this.customerService.getCustomerName+" account created successfully!");
        this.router.navigate(["accountinfo"])
      } else {
        this.transactionMessage = 'Payment failed! Please try again.';
        alert(res?.message || 'Payment failed!');
      }
    }, (error: HttpErrorResponse) => {
      this.handleError(error);
    });
  } else {
    this.transactionMessage = 'Please fill out all fields correctly.';
  }
}

private handleError(error: HttpErrorResponse) {
const statusMessages: { [key: number]: string } = {
  400: "Bad request: Please check your inputs.",
  404: "Resource not found: Please check the entered details.",
  500: "Server error. Please try again later.",
};

const errorMessage = statusMessages[error.status] || "An unexpected error occurred.";
this.transactionMessage = errorMessage;
alert(errorMessage);

console.error('Error details:', error);
this.upiForm.reset();
}
}


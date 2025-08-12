import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CustomerService } from '../login/customerservice';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, HttpClientModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  paymentForm: FormGroup;
  isFormSubmitted = false;  
  transactionMessage: string = '';
  paymentInfo: any;
  accountIdValue = this.customerService.getAccountNumber();

  constructor(private http: HttpClient,private router: Router,private formBuilder:FormBuilder,private customerService: CustomerService) {
    debugger;
    const customerNameIdValue = this.customerService.getCustomerName();
    const PaymentAmountIdValue = this.customerService.getPaymentAmount();
    console.log(this.accountIdValue);
    console.log(customerNameIdValue);
    this.paymentForm= this.formBuilder.group({
      accountNumber: new FormControl(this.accountIdValue),
      customerName: new FormControl(customerNameIdValue, Validators.required),
      paymentAmount: new FormControl(PaymentAmountIdValue,Validators.required),
      paymentType: new FormControl("",[Validators.required]),
      accountBalance: new FormControl(0),
      createdBy: new FormControl("")
    })
  }

  onSubmit() {
    this.isFormSubmitted = true;

    debugger;
    if (this.paymentForm.valid) {
      debugger;
      this.http.get<any>(`http://localhost:9090/api/v1/customerBankingPayment/accountNumber/${this.accountIdValue}`).subscribe(
        (data) => {
          debugger;
          this.paymentInfo = data;
          console.log("payment component values : ", data);
          this.paymentForm.patchValue({
            accountBalance: this.paymentInfo.accountBalance
          });
        },(error: HttpErrorResponse) => {
          this.paymentForm.patchValue({
            accountBalance: 0
          });
          this.handleError(error);
        });
      
      this.http.post('http://localhost:9090/api/v1/customerBankingPayment', this.paymentForm.value)
        .subscribe((res: any) => {
          if (res) {
            debugger;
            this.transactionMessage = `Going to the transaction page`;
            alert("Navigate to transaction page");
            this.customerService.setPaymentId(res.paymentId);
            this.handlePaymentMethodNavigation(res.paymentType);
          } else {
            this.transactionMessage = 'Payment failed! Please try again.';
            alert(res?.message || 'Payment failed!');
          }
        }, (error: HttpErrorResponse) => {
          this.handleError(error);
        });
    }
  }

  //Handle navigation based on the selected payment method
  private handlePaymentMethodNavigation(paymentType: string) {
    debugger;
    switch (paymentType) {
      case 'creditCard':
        this.router.navigate(["creditCard"]);
        break;
      case 'debitCard':
        this.router.navigate(["debitCard"]);
        break;
      case 'upi':
        this.router.navigate(["upi"]);
        break;
      default:
        this.transactionMessage = 'Invalid payment method.';
        alert('Invalid payment method.');
        break;
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
    this.paymentForm.reset();
  }
}
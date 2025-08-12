import { Component } from '@angular/core';
import { InnernavbarComponent } from '../innernavbar/innernavbar.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { CustomerService } from '../login/customerservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposit-withdraw',
  standalone: true,
  imports: [InnernavbarComponent,FormsModule, ReactiveFormsModule,CommonModule, HttpClientModule],
  templateUrl: './deposit-withdraw.component.html',
  styleUrl: './deposit-withdraw.component.css'
})
export class DepositWithdrawComponent {

  depositWithdrawUserForm: FormGroup;
  depositWithdrawInfo: any = {};
  accountIdNumber = this.customerService.getAccountNumber();
  customerIdName = this.customerService.getCustomerName();

    constructor(
    private http: HttpClient,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.depositWithdrawUserForm = this.formBuilder.group({
      accountNumber: new FormControl('', [Validators.required]),
      customerName: new FormControl('', [Validators.required]),
      paymentAmount: new FormControl('', [Validators.required]),
      accountBalance: new FormControl(''),
      transationType: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    console.log("deposit withdraw component account number : ", this.accountIdNumber);
    this.depositWithdrawUserForm.patchValue({
    accountNumber: this.accountIdNumber,
    customerName: this.customerIdName
  });
  }

  onProceed(){
    if(this.depositWithdrawUserForm.valid){
      if(this.depositWithdrawUserForm.value.transationType === "deposit"){
        this.deposit();
      }else{
        this.withdraw();
      }
    }
  }
  withdraw() {
    this.http.get<any>(`http://localhost:9090/api/v1/customerBankingPayment/accountNumber/${this.accountIdNumber}`).subscribe(
      (data) => {
        this.depositWithdrawInfo = data;
        console.log("deposit withdraw component values : ", data);
        this.depositWithdrawUserForm.patchValue({
          accountBalance: this.depositWithdrawInfo.accountBalance
        });
        if( this.depositWithdrawUserForm.value.accountBalance >= this.depositWithdrawUserForm.value.paymentAmount){
          const ithdrawAmountBalance= this.depositWithdrawUserForm.value.accountBalance - this.depositWithdrawUserForm.value.paymentAmount;
          this.depositWithdrawUserForm.patchValue({
            accountBalance: ithdrawAmountBalance
          });
          this.http.post(`http://localhost:9090/api/v1/customerBankingPayment/withdraw`,this.depositWithdrawUserForm.value).subscribe();
          this.router.navigate(["checkbalance"]);
        }else{
          alert("unsufficient balance in your account!");
        }
      },
      (error) => {
        console.error('Error fetching check balance info:', error); // Handle error
      }
    );
  }
  
  deposit() {
        this.customerService.removePaymentId();
        this.customerService.removePaymentAmount();
        this.customerService.setPaymentAmount(this.depositWithdrawUserForm.value.paymentAmount);
        this.router.navigate(["payment"]);
  }
}

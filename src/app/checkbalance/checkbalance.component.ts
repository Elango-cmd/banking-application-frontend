import { Component, ElementRef, Renderer2 } from '@angular/core';
import { InnernavbarComponent } from '../innernavbar/innernavbar.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomerService } from '../login/customerservice';

@Component({
  selector: 'app-checkbalance',
  standalone: true,
  imports: [InnernavbarComponent,FormsModule, ReactiveFormsModule,CommonModule, HttpClientModule],
  templateUrl: './checkbalance.component.html',
  styleUrl: './checkbalance.component.css'
})
export class CheckbalanceComponent {

  checkBalanceUserForm: FormGroup;
  checkBalanceInfo: any = {};
  accountIdNumber = this.customerService.getAccountNumber();

  constructor(
    private http: HttpClient,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private el: ElementRef, 
    private renderer: Renderer2
  ) {
    this.checkBalanceUserForm = this.formBuilder.group({
      accountNumber: new FormControl('', [Validators.required]),
      customerName: new FormControl('', [Validators.required]),
      accountBalance: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    console.log("check balance component account number : ", this.accountIdNumber);
    this.checkBalanceUserForm.patchValue({
    accountNumber: this.accountIdNumber
  });
  }
  onCheck(){
    if(this.accountIdNumber !== null){
      this.http.get<any>(`http://localhost:9090/api/v1/customerBankingPayment/accountNumber/${this.accountIdNumber}`).subscribe(
        (data) => {
          this.checkBalanceInfo = data;
          
          console.log("account info component values : ", data);
  
          this.checkBalanceUserForm.patchValue({
            customerName: this.checkBalanceInfo.customerName,
            accountBalance: this.checkBalanceInfo.accountBalance,
          });
          this.renderer.setStyle(this.el.nativeElement.querySelector('.check-balance-hide'), 'visibility', 'visible');
        },
        (error) => {
          console.error('Error fetching check balance info:', error); // Handle error
        }
      );
    }else{
      console.error('Error fetching check balance info: convert error account number'); 
    }

  }

}


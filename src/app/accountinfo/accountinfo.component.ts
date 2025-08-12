import { Component } from '@angular/core';
import { InnernavbarComponent } from '../innernavbar/innernavbar.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomerService } from '../login/customerservice';

@Component({
  selector: 'app-accountinfo',
  standalone: true,
  imports: [InnernavbarComponent,FormsModule, ReactiveFormsModule,CommonModule, HttpClientModule],
  templateUrl: './accountinfo.component.html',
  styleUrl: './accountinfo.component.css'
})
export class AccountinfoComponent {

  accountUserForm: FormGroup;
  accountInfo: any = {};

  constructor(
    private http: HttpClient,
    private customerService: CustomerService,
    private formBuilder: FormBuilder
  ) {
    this.accountUserForm = this.formBuilder.group({
      customerName: new FormControl('', [Validators.required]),
      accountNumber: new FormControl('', [Validators.required]),
      accountType: new FormControl('', [Validators.required]),
      IFSCNumber: new FormControl('', [Validators.required]),
      bankBranch: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    const accountIdNumber = this.customerService.getAccountNumber();
    console.log("account info component account number : ", accountIdNumber);
    if(accountIdNumber !== null){
    this.http.get<any>(`http://localhost:9090/api/v1/customerBankingLogic/accountNumber/${accountIdNumber}`).subscribe(
      (data) => {
        this.accountInfo = data[0];
        
        console.log("account info component values : ", data[0]);

        this.accountUserForm.patchValue({
          customerName: this.accountInfo.customerName,
          accountNumber: this.accountInfo.accountNumber,
          accountType: this.accountInfo.accountType,
          IFSCNumber: this.accountInfo.ifscnumber,
          bankBranch: this.accountInfo.bankBranch,
        });
      },
      (error) => {
        console.error('Error fetching account info:', error); // Handle error
      }
    );
  }else{
    console.error('Error fetching account info: convert error account number'); 
  }
}
}
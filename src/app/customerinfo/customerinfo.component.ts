import { Component } from '@angular/core';
import { InnernavbarComponent } from "../innernavbar/innernavbar.component";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CustomerService } from '../login/customerservice';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customerinfo',
  standalone: true,
  imports: [InnernavbarComponent,FormsModule, ReactiveFormsModule,CommonModule, HttpClientModule],
  templateUrl: './customerinfo.component.html',
  styleUrl: './customerinfo.component.css'
})
export class CustomerinfoComponent {
  customerUserForm: FormGroup;
  customerInfo: any = {};

  constructor(
    private http: HttpClient,
    private customerService: CustomerService,
    private formBuilder: FormBuilder
  ) {
    this.customerUserForm = this.formBuilder.group({
      customerName: new FormControl('', [Validators.required]),
      accountNumber: new FormControl('', [Validators.required]),
      accountType: new FormControl('', [Validators.required]),
      customerAddress: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      emailId: new FormControl('', [Validators.required]),
      aadharNumber: new FormControl('', [Validators.required]),
      panNumber: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    const accountIdNumber = this.customerService.getAccountNumber();
    console.log("customer info component account number : ", accountIdNumber);
    if(accountIdNumber !== null){
    this.http.get<any>(`http://localhost:9090/api/v1/customerBankingData/accountNumber/${accountIdNumber}`).subscribe(
      (data) => {
        this.customerInfo = data[0];
        
        console.log("account info component values : ", data[0]);

        this.customerUserForm.patchValue({
          customerName: this.customerInfo.customerName,
          accountNumber: this.customerInfo.accountNumber,
          accountType: this.customerInfo.accountType,
          customerAddress: this.customerInfo.customerAddress,
          dateOfBirth: this.customerInfo.dateOfBirth,
          phoneNumber: this.customerInfo.phoneNumber,
          emailId: this.customerInfo.emailId,
          aadharNumber: this.customerInfo.aadharNumber,
          panNumber: this.customerInfo.panNumber
        });
      },
      (error) => {
        console.error('Error fetching customer info:', error); 
      }
    );
  }else{
    console.error('Error fetching customer info: convert error account number'); 
  }
}
}

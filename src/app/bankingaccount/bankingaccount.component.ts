import { CommonModule } from '@angular/common'
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { Component } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { CustomerService } from '../login/customerservice'

@Component({
  selector: 'app-bankingaccount',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,CommonModule, HttpClientModule],
  templateUrl: './bankingaccount.component.html',
  styleUrl: './bankingaccount.component.css'
})
export class BankingaccountComponent {

  accUserForm: FormGroup
  isFormSubmitted: boolean = false
  

  constructor(private http: HttpClient,private router: Router ,private formBuilder:FormBuilder,private customerService: CustomerService) {
    const customerIdValue = this.customerService.getCustomerId() 
    console.log('Customer ID from banking account service:', customerIdValue)
    this.accUserForm= this.formBuilder.group({
      customerId:new FormControl(customerIdValue),
      customerName: new FormControl("",[Validators.required]),
      age: new FormControl("",[Validators.required]),
      dateOfBirth: new FormControl("",[Validators.required]),
      customerAddress: new FormControl("",[Validators.required]),
      phoneNumber: new FormControl("",[Validators.required,Validators.minLength(10)]),
      emailId: new FormControl("",[Validators.required,Validators.email]),
      aadharNumber: new FormControl("",[Validators.required,Validators.pattern('^[2-9]{1}[0-9]{11}$')]),
      panNumber: new FormControl("",[Validators.required,Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]),
      accountType: new FormControl("",[Validators.required]),
      createdBy: new FormControl("")
    })
  }


  onAccCreate(){
    this.isFormSubmitted =  true
    console.log('Form Values:', this.accUserForm.value)
  
    if(this.accUserForm.valid){
      debugger;
      this.http.post('http://localhost:9090/api/v1/customerBankingData',this.accUserForm.value).subscribe((res: any) => {
        if(res){
          console.log("bank account componant : ",res.accountNumber);
          console.log("bank account componant : ",res.customerName);
          this.customerService.setAccountNumber(res.accountNumber);
          this.customerService.setCustomerName(res.customerName);
          this.customerService.setPaymentAmount(5000);
          this.http.post('http://localhost:9090/api/v1/customerBankingLogic',res).subscribe();
          this.router.navigate(["payment"]);
      }
    },(error: HttpErrorResponse) => {  
        if (error.error && error.error.message) {
          alert(error.error.value)
        } else {
          alert('customer banking detail : An unexpected error occurred.')
        }
        console.error('Error details:', error)
        this.accUserForm.reset()
      })
    }else {
      console.log('Form is invalid')
      alert('Please fill out the form correctly.')
    }
  }
}

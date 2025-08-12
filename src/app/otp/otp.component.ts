import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../login/customerservice';


@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule, HttpClientModule],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.css'
})
export class OtpComponent {

  otpUserForm: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(  private http: HttpClient,private router: Router ,private formBuilder:FormBuilder,private customerService: CustomerService) {
    this.otpUserForm= this.formBuilder.group({
      customerId: new FormControl(customerService.getCustomerId(),Validators.required),
      otp: new FormControl("",[Validators.required])
    })
  }

  onOTP(){

    this.isFormSubmitted =  true;
    if(this.otpUserForm.valid){
      this.http.put('http://localhost:9090/api/v1/customerData/otp',this.otpUserForm.value).subscribe((res: any) => {
        if(res){
          alert("Your Gmail Verified Success");
          console.log("otp componant customer id is : ",res.customerId)
          this.router.navigate(["login"]);
        }else{
          alert(res.message);
        }
      },(error: HttpErrorResponse) => {  
        if (error.status === 404) {
          alert("Please check the email id or phone number, it's already exist");
        } else if (error.status === 400) {
          alert("Bad request: Please check your inputs.");
        } else if (error.status === 500) {
          alert("Server error. Please try again later.");
        } else {
          alert("An unexpected error occurred.");
        }
        console.error('Error details:', error);
        this.otpUserForm.reset();
      })
    }
  }
}

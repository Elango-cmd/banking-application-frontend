import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CustomerService } from '../login/customerservice';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule,CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  regUserForm: FormGroup;
  isFormSubmitted: boolean = false;


  constructor(  private http: HttpClient,private router: Router ,private formBuilder:FormBuilder,private customerService: CustomerService) {
    this.regUserForm= this.formBuilder.group({
      customerName: new FormControl("",[Validators.required]),
      phoneNumber: new FormControl("",[Validators.required,Validators.minLength(10)]),
      emailId: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",[Validators.required,Validators.minLength(6)]),
      crmpassword: new FormControl("",[Validators.required,Validators.minLength(6)]),
      createdBy: new FormControl("")
    },
    {
      validators: this.MustMatch('password', 'crmpassword')
    })
  }


  MustMatch(controlName: string, matchControlName: string){
    return(formGroup:FormGroup)=>{
      const control = formGroup.controls[controlName];
      const matchControl = formGroup.controls[matchControlName];
      if(matchControl.errors && !matchControl.errors['MustMatch']){
        return
      }
      if(control.value !== matchControl.value){
        matchControl.setErrors({MustMatch:true});
      }else{
        matchControl.setErrors(null);
      }
    }
  }

  onRegister(){

    this.isFormSubmitted =  true;
    if(this.regUserForm.valid){
      this.http.post('http://localhost:9090/api/v1/customerData',this.regUserForm.value).subscribe((res: any) => {
        if(res){
          alert("Registeration Success");
          this.customerService.setCustomerId(res.customerId);
          console.log("register componant customer id is : ",res.customerId)
          this.router.navigate(["otp"]);
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
        this.regUserForm.reset();
      })
    }
  }
}





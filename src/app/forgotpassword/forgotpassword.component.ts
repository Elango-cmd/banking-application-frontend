import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.css'
})
export class ForgotpasswordComponent {

  forgotUserForm: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(private http: HttpClient, private router:Router,private formBuilder:FormBuilder) {
    this.forgotUserForm= this.formBuilder.group({
      emailId: new FormControl("",[Validators.required,Validators.email])
    })
  }

  onForgot(){
    this.isFormSubmitted =  true;
    const email = this.forgotUserForm.value.emailId; 
    if(this.forgotUserForm.valid){
    this.http.get('http://localhost:9090/api/v1/customerData/emailId/forgot',{
      params: new HttpParams().set('emailId',email)
    }).subscribe((res:any) =>{
      if(res){
        alert("Request Success");
        this.router.navigate(["reset"]);
      }else{
        alert(res.message);
      }
    },(error: HttpErrorResponse) => {  
      if (error.status === 404) {
        alert("Please enter the valid emil id.");
      } else if (error.status === 400) {
        alert("Bad request: Please check your inputs.");
      } else if (error.status === 500) {
        alert("Server error. Please try again later.");
      } else {
        alert("An unexpected error occurred.");
      }
      console.error('Error details:', error);
      this.forgotUserForm.reset();
    });
  }
  }
}


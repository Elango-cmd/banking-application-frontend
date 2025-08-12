import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CustomerService } from './customerservice';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule, RouterLinkActive, ReactiveFormsModule,CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  loginUserForm: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(private http: HttpClient, private router: Router, private formBuilder:FormBuilder,private customerService: CustomerService) {
    this.loginUserForm= this.formBuilder.group({
      emailId: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",[Validators.required,Validators.minLength(6)])
    })
  }

  onLogin(){
    this.isFormSubmitted =  true;
    if(this.loginUserForm.valid){
    this.http.post('http://localhost:9090/api/v1/customerData/emailId/login',this.loginUserForm.value).subscribe((res:any) =>{
      debugger;
      if(res){
        alert("Login Success");
        this.router.navigate(['home']);
      }else{
        alert(res.message);
      }
    },(error: HttpErrorResponse) => {  
      if (error.status === 404) {
        alert(" Please enter the valid email and password.");
      } else if (error.status === 400) {
        alert("Bad request: Please check your inputs.");
      } else if (error.status === 500) {
        alert("Server error. Please try again later.");
      } else {
        alert("An unexpected error occurred.");
      }
      console.error('Error details:', error);
      this.loginUserForm.reset();
    });
  }
  }
}


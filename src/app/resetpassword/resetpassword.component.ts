import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [ ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {

  resetUserForm: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(private http: HttpClient,private router:Router, private formBuilder:FormBuilder){

    this.resetUserForm= this.formBuilder.group({
      emailId: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",[Validators.required,Validators.minLength(6)]),
      crmpassword: new FormControl("",[Validators.required,Validators.minLength(6)])
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

  onReset(){

    this.isFormSubmitted =  true;
    const email = this.resetUserForm.value.emailId; 
    if(this.resetUserForm.valid){
    this.http.put('http://localhost:9090/api/v1/customerData/password',this.resetUserForm.value).subscribe((res:any) =>{
      if(res){
        alert("Reset Password Success");
        this.router.navigate(["login"]);
      }else{
        alert(res?.message || "Something went wrong.");
      }
    },(error: HttpErrorResponse) => {  
      if (error.status === 404) {
        alert("Customer not found. Please check the email and try again.");
      } else if (error.status === 400) {
        alert("Bad request: Please check your inputs.");
      } else if (error.status === 500) {
        alert("Server error. Please try again later.");
      } else {
        alert("An unexpected error occurred.");
      }
      console.error('Error details:', error);
      this.resetUserForm.reset();
    });
  }
}
}


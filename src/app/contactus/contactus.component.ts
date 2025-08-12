import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [ ReactiveFormsModule,CommonModule, HttpClientModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {

  contactUserForm: FormGroup;
  isFormSubmitted: boolean = false;


  constructor(  private http: HttpClient,private router: Router ,private formBuilder:FormBuilder) {
    this.contactUserForm= this.formBuilder.group({
      customerName: new FormControl("",[Validators.required]),
      phoneNumber: new FormControl("",[Validators.required,Validators.minLength(10)]),
      emailId: new FormControl("",[Validators.required,Validators.email]),
      message: new FormControl("",[Validators.required])
    })
  }

  onContact(){

    this.isFormSubmitted =  true;
    if(this.contactUserForm.valid){
    alert("From Submit Success");
    this.router.navigate(["home"]);
    }

      // this.http.post('http://localhost:9090/api/v1/customerData',this.contactUserForm.value).subscribe((res: any) => {
      //   if(res){
      //     alert("From Submit Success");
      //     this.router.navigate(["home"]);
      //   }else{
      //     alert(res.message);
      //   }
      // },(error: HttpErrorResponse) => {  
      //   if (error.status === 404) {
      //     alert("Please check the email id or phone number");
      //   } else if (error.status === 400) {
      //     alert("Bad request: Please check your inputs.");
      //   } else if (error.status === 500) {
      //     alert("Server error. Please try again later.");
      //   } else {
      //     alert("An unexpected error occurred.");
      //   }
      //   console.error('Error details:', error);
      //   this.contactUserForm.reset();
      // })
      
  }

}

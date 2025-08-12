import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { TermsComponent } from "./terms/terms.component";
import { ForgotpasswordComponent } from "./forgotpassword/forgotpassword.component";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ResetpasswordComponent } from "./resetpassword/resetpassword.component";
import { SecurityPracticesComponent } from "./security-practices/security-practices.component";
import { ContactusComponent } from "./contactus/contactus.component";
import { DisclaimersComponent } from "./disclaimers/disclaimers.component";
import { FaqComponent } from "./faq/faq.component";
import { CustomersupportComponent } from "./customersupport/customersupport.component";
import { BankingaccountComponent } from "./bankingaccount/bankingaccount.component";
import { CustomerinfoComponent } from "./customerinfo/customerinfo.component";
import { AccountinfoComponent } from "./accountinfo/accountinfo.component";
import { PaymentComponent } from "./payment/payment.component";
import { CreditcardComponent } from "./creditcard/creditcard.component";
import { DebitcardComponent } from "./debitcard/debitcard.component";
import { UpiComponent } from "./upi/upi.component";
import { OtpComponent } from "./otp/otp.component";
import { CheckbalanceComponent } from "./checkbalance/checkbalance.component";
import { DepositWithdrawComponent } from "./deposit-withdraw/deposit-withdraw.component";

export const routes: Routes = [ 
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'home',component:HomeComponent},
    {path: 'about',component:AboutComponent},
    {path: 'login',component: LoginComponent},
    {path: 'register',component: RegisterComponent},
    {path: 'customerinfo',component:CustomerinfoComponent},
    {path: 'terms', component:TermsComponent},
    {path: 'forgot', component: ForgotpasswordComponent},
    {path:'reset' , component:ResetpasswordComponent},
    {path:'security' , component: SecurityPracticesComponent},
    {path:'contact', component:ContactusComponent},
    {path:'disclaimers', component:DisclaimersComponent},
    {path:'faq', component:FaqComponent},
    {path:'customersupport', component:CustomersupportComponent},
    {path:'bankingaccount', component:BankingaccountComponent},
    {path:'accountinfo',component:AccountinfoComponent},
    {path:'payment',component:PaymentComponent},
    {path:'creditCard',component:CreditcardComponent},
    {path:'debitCard',component:DebitcardComponent},
    {path:'upi',component:UpiComponent},
    {path:'otp',component:OtpComponent},
    {path:'checkbalance',component:CheckbalanceComponent},
    {path:'deposit-withdraw',component:DepositWithdrawComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes),
        BrowserModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    exports: [RouterModule],
    providers:[]
  })

  export class AppRoutingModule { }
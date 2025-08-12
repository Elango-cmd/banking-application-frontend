import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {

  faqs = [
    { question: 'How do I reset my password?', answer: 'To reset your password, click on "Forgot Password" on the login page and follow the instructions.', open: false },
    { question: 'What should I do if I forget my username?', answer: 'If you forget your username, you can retrieve it by going to the "Forgot Username" section and entering your email address.', open: false },
    { question: 'How do I contact customer support?', answer: 'You can contact customer support through the "Contact Us" page or by emailing support@example.com.', open: false },
    { question: 'How do I delete my account?', answer: 'To delete your account, please contact support and request the deletion of your account.', open: false },
    { question: 'What payment methods do you accept?', answer: 'We accept credit cards, PayPal, and bank transfers.', open: false }
  ];

  // Toggle the answer visibility
  toggleAnswer(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  title = 'Welcome to Our Banking Services';
  description = 'At EVILAN BANK, we are committed to providing secure, innovative, and customer-centric financial services. With a rich history of trust and reliability, we offer a wide range of banking solutions, including personal accounts, loans, investments, and business banking services. Our advanced digital platform allows customers to manage their finances anytime, anywhere, making banking more accessible and convenient. We prioritize security, using cutting-edge technology to ensure that your transactions and data are always protected. At the heart of our operations is a deep commitment to customer satisfaction, offering personalized services and expert financial advice to help you achieve your financial goals.';

  // Example method for further interactions if needed
  getInfo() {
    return 'Learn more about us and our values.';
  }
}

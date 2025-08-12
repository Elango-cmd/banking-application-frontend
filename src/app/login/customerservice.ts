import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private customerIdKey = 'customerId';
  private accountIDNumber = 'accountNumber';
  private customerIdName = 'customerName';
  private paymentIdAmount = 'paymentAmount';
  private paymentIdKey = 'paymentId';

  constructor() {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  getCustomerId(): number | null {
    if (this.isBrowser()) {
      const customerId = localStorage.getItem(this.customerIdKey);
      return customerId ? parseInt(customerId, 10) : null;
    }
    return null;
  }

  setCustomerId(customerId: number): void {
    if (this.isBrowser()) {
      if (customerId !== undefined && customerId !== null) {
        localStorage.setItem(this.customerIdKey, customerId.toString());
      } else {
        console.error('Attempted to set an invalid customerId:', customerId);
      }
    }
  }

  removeCustomerId(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.customerIdKey);
    }
  }

  getAccountNumber(): number | null {
    if (this.isBrowser()) {
      const accountNumber = localStorage.getItem(this.accountIDNumber);
      return accountNumber ? parseInt(accountNumber, 10) : null;
    }
    return null;
  }

  setAccountNumber(accountNumber: number): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.accountIDNumber, accountNumber.toString());
    }
  }

  removeAccountNumber(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.accountIDNumber);
    }
  }

  getCustomerName(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem(this.customerIdName);
    }
    return null;
  }

  setCustomerName(customerName: string): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.customerIdName, customerName);
    }
  }

  removeCustomerName(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.customerIdName);
    }
  }

  getPaymentAmount(): number | null {
    if (this.isBrowser()) {
      const paymentAmount = localStorage.getItem(this.paymentIdAmount);
      return paymentAmount ? parseInt(paymentAmount, 10) : null;
    }
    return null;
  }

  setPaymentAmount(paymentAmount: number): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.paymentIdAmount, paymentAmount.toString());
    }
  }

  removePaymentAmount(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.paymentIdAmount);
    }
  }

  getPaymentId(): number | null {
    if (this.isBrowser()) {
      const paymentId = localStorage.getItem(this.paymentIdKey);
      return paymentId ? parseInt(paymentId, 10) : null;
    }
    return null;
  }

  setPaymentId(paymentId: number): void {
    if (this.isBrowser()) {
      if (paymentId !== undefined && paymentId !== null) {
        localStorage.setItem(this.paymentIdKey, paymentId.toString());
      } else {
        console.error('Attempted to set an invalid paymentId:', paymentId);
      }
    }
  }

  removePaymentId(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.paymentIdKey);
    }
  }
}

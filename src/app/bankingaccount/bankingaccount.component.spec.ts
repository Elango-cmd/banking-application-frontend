import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingaccountComponent } from './bankingaccount.component';

describe('BankingaccountComponent', () => {
  let component: BankingaccountComponent;
  let fixture: ComponentFixture<BankingaccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankingaccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BankingaccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

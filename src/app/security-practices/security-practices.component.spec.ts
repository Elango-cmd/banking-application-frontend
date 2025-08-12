import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityPracticesComponent } from './security-practices.component';

describe('SecurityPracticesComponent', () => {
  let component: SecurityPracticesComponent;
  let fixture: ComponentFixture<SecurityPracticesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityPracticesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SecurityPracticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

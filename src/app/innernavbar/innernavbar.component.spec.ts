import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnernavbarComponent } from './innernavbar.component';

describe('InnernavbarComponent', () => {
  let component: InnernavbarComponent;
  let fixture: ComponentFixture<InnernavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InnernavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InnernavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

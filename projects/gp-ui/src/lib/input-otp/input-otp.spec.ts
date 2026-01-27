import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputOtp } from './input-otp';

describe('InputOtp', () => {
  let component: InputOtp;
  let fixture: ComponentFixture<InputOtp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputOtp],
    }).compileComponents();

    fixture = TestBed.createComponent(InputOtp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

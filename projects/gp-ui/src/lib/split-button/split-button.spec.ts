import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitButton } from './split-button';

describe('SplitButton', () => {
  let component: SplitButton;
  let fixture: ComponentFixture<SplitButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplitButton],
    }).compileComponents();

    fixture = TestBed.createComponent(SplitButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Blockui } from './blockui';

describe('Blockui', () => {
  let component: Blockui;
  let fixture: ComponentFixture<Blockui>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Blockui],
    }).compileComponents();

    fixture = TestBed.createComponent(Blockui);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

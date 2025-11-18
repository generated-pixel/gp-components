import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseEditable } from './base-editable';

describe('BaseEditable', () => {
  let component: BaseEditable;
  let fixture: ComponentFixture<BaseEditable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseEditable],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseEditable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseIcon } from './base-icon';

describe('BaseIcon', () => {
  let component: BaseIcon;
  let fixture: ComponentFixture<BaseIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

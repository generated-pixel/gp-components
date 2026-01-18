import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleXIcon } from './circle-x-icon';

describe('CircleXIcon', () => {
  let component: CircleXIcon;
  let fixture: ComponentFixture<CircleXIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleXIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(CircleXIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

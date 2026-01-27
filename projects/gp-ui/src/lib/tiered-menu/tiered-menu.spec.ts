import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TieredMenu } from './tiered-menu';

describe('TieredMenu', () => {
  let component: TieredMenu;
  let fixture: ComponentFixture<TieredMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TieredMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(TieredMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpUi } from './gp-ui';

describe('GpUi', () => {
  let component: GpUi;
  let fixture: ComponentFixture<GpUi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GpUi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GpUi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterGroup } from './meter-group';

describe('MeterGroup', () => {
  let component: MeterGroup;
  let fixture: ComponentFixture<MeterGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeterGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(MeterGroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

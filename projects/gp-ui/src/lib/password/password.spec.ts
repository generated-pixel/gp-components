import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GpPassword } from './password';

describe('Password', () => {
  let component: GpPassword;
  let fixture: ComponentFixture<GpPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GpPassword],
    }).compileComponents();

    fixture = TestBed.createComponent(GpPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

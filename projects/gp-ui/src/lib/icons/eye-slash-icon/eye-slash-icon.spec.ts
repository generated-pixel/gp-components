import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeSlashIcon } from './eye-slash-icon';

describe('EyeSlashIcon', () => {
  let component: EyeSlashIcon;
  let fixture: ComponentFixture<EyeSlashIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EyeSlashIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(EyeSlashIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Basecomponent } from './basecomponent';

describe('Basecomponent', () => {
  let component: Basecomponent;
  let fixture: ComponentFixture<Basecomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Basecomponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Basecomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireTalentComponent } from './hire-talent.component';

describe('HireTalentComponent', () => {
  let component: HireTalentComponent;
  let fixture: ComponentFixture<HireTalentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HireTalentComponent]
    });
    fixture = TestBed.createComponent(HireTalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

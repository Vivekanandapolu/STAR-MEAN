import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BachelorDesignComponent } from './bachelor-design.component';

describe('BachelorDesignComponent', () => {
  let component: BachelorDesignComponent;
  let fixture: ComponentFixture<BachelorDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BachelorDesignComponent]
    });
    fixture = TestBed.createComponent(BachelorDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

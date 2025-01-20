import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiViDesignComponent } from './ui-vi-design.component';

describe('UiViDesignComponent', () => {
  let component: UiViDesignComponent;
  let fixture: ComponentFixture<UiViDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UiViDesignComponent]
    });
    fixture = TestBed.createComponent(UiViDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

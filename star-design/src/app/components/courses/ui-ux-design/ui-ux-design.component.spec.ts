import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UIUXDesignComponent } from './ui-ux-design.component';

describe('UIUXDesignComponent', () => {
  let component: UIUXDesignComponent;
  let fixture: ComponentFixture<UIUXDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UIUXDesignComponent]
    });
    fixture = TestBed.createComponent(UIUXDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

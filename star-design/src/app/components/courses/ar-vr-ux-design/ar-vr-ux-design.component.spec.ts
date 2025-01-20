import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArVrUxDesignComponent } from './ar-vr-ux-design.component';

describe('ArVrUxDesignComponent', () => {
  let component: ArVrUxDesignComponent;
  let fixture: ComponentFixture<ArVrUxDesignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArVrUxDesignComponent]
    });
    fixture = TestBed.createComponent(ArVrUxDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

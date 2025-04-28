import { ComponentFixture, TestBed } from '@angular/core/testing';

import { View360Component } from './view-360.component';

describe('View360Component', () => {
  let component: View360Component;
  let fixture: ComponentFixture<View360Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [View360Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(View360Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

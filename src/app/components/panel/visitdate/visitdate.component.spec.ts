import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitdateComponent } from './visitdate.component';

describe('VisitdateComponent', () => {
  let component: VisitdateComponent;
  let fixture: ComponentFixture<VisitdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

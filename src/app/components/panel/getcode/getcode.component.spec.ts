import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetcodeComponent } from './getcode.component';

describe('GetcodeComponent', () => {
  let component: GetcodeComponent;
  let fixture: ComponentFixture<GetcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetcodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

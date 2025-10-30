import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewShowComponent } from './interview-show.component';

describe('InterviewShowComponent', () => {
  let component: InterviewShowComponent;
  let fixture: ComponentFixture<InterviewShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewShowComponent]
    });
    fixture = TestBed.createComponent(InterviewShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

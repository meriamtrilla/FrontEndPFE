import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewpassComponent } from './interviewpass.component';

describe('InterviewpassComponent', () => {
  let component: InterviewpassComponent;
  let fixture: ComponentFixture<InterviewpassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterviewpassComponent]
    });
    fixture = TestBed.createComponent(InterviewpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

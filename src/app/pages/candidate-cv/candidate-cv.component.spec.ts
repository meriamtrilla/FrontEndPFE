import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateCVComponent } from './candidate-cv.component';

describe('CandidateCVComponent', () => {
  let component: CandidateCVComponent;
  let fixture: ComponentFixture<CandidateCVComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateCVComponent]
    });
    fixture = TestBed.createComponent(CandidateCVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

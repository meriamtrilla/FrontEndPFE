import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateLayoutComponent } from './candidate-layout.component';

describe('CandidateLayoutComponent', () => {
  let component: CandidateLayoutComponent;
  let fixture: ComponentFixture<CandidateLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateLayoutComponent]
    });
    fixture = TestBed.createComponent(CandidateLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

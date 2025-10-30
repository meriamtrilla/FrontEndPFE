import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidateOfferListComponent } from './candidate-offer-list.component';

describe('CandidateOfferListComponent', () => {
  let component: CandidateOfferListComponent;
  let fixture: ComponentFixture<CandidateOfferListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CandidateOfferListComponent]
    });
    fixture = TestBed.createComponent(CandidateOfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

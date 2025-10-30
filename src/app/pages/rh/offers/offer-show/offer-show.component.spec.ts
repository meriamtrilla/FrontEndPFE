import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferShowComponent } from './offer-show.component';

describe('OfferShowComponent', () => {
  let component: OfferShowComponent;
  let fixture: ComponentFixture<OfferShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferShowComponent]
    });
    fixture = TestBed.createComponent(OfferShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

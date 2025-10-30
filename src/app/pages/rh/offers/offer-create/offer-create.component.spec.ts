import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferCreateComponent } from './offer-create.component';

describe('OfferCreateComponent', () => {
  let component: OfferCreateComponent;
  let fixture: ComponentFixture<OfferCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferCreateComponent]
    });
    fixture = TestBed.createComponent(OfferCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

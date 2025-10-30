import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseLayoutComponent } from './enterprise-layout.component';

describe('EnterpriseLayoutComponent', () => {
  let component: EnterpriseLayoutComponent;
  let fixture: ComponentFixture<EnterpriseLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnterpriseLayoutComponent]
    });
    fixture = TestBed.createComponent(EnterpriseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

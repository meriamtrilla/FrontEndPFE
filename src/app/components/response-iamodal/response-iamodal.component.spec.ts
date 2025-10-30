import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseIAModalComponent } from './response-iamodal.component';

describe('ResponseIAModalComponent', () => {
  let component: ResponseIAModalComponent;
  let fixture: ComponentFixture<ResponseIAModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResponseIAModalComponent]
    });
    fixture = TestBed.createComponent(ResponseIAModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

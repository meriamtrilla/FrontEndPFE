import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIntrestComponent } from './add-intrest.component';

describe('AddIntrestComponent', () => {
  let component: AddIntrestComponent;
  let fixture: ComponentFixture<AddIntrestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddIntrestComponent]
    });
    fixture = TestBed.createComponent(AddIntrestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIntrestComponent } from './edit-intrest.component';

describe('EditIntrestComponent', () => {
  let component: EditIntrestComponent;
  let fixture: ComponentFixture<EditIntrestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditIntrestComponent]
    });
    fixture = TestBed.createComponent(EditIntrestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

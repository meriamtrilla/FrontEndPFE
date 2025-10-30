import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearSelectComponent } from './year-select.component';

describe('YearSelectComponent', () => {
  let component: YearSelectComponent;
  let fixture: ComponentFixture<YearSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YearSelectComponent]
    });
    fixture = TestBed.createComponent(YearSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

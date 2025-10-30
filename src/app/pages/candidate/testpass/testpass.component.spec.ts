import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestpassComponent } from './testpass.component';

describe('TestpassComponent', () => {
  let component: TestpassComponent;
  let fixture: ComponentFixture<TestpassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestpassComponent]
    });
    fixture = TestBed.createComponent(TestpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

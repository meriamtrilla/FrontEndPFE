import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestsAdminComponent } from './tests-admin.component';

describe('TestsAdminComponent', () => {
  let component: TestsAdminComponent;
  let fixture: ComponentFixture<TestsAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestsAdminComponent]
    });
    fixture = TestBed.createComponent(TestsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersRHComponent } from './users-rh.component';

describe('UsersRHComponent', () => {
  let component: UsersRHComponent;
  let fixture: ComponentFixture<UsersRHComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersRHComponent]
    });
    fixture = TestBed.createComponent(UsersRHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

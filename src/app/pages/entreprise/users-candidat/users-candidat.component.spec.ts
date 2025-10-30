import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCandidatComponent } from './users-candidat.component';

describe('UsersCandidatComponent', () => {
  let component: UsersCandidatComponent;
  let fixture: ComponentFixture<UsersCandidatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersCandidatComponent]
    });
    fixture = TestBed.createComponent(UsersCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetModalComponent } from './meet-modal.component';

describe('MeetModalComponent', () => {
  let component: MeetModalComponent;
  let fixture: ComponentFixture<MeetModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetModalComponent]
    });
    fixture = TestBed.createComponent(MeetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

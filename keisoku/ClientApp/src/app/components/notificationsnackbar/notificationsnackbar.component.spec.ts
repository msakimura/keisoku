import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsnackbarComponent } from './notificationsnackbar.component';

describe('NotificationsnackbarComponent', () => {
  let component: NotificationsnackbarComponent;
  let fixture: ComponentFixture<NotificationsnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationsnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

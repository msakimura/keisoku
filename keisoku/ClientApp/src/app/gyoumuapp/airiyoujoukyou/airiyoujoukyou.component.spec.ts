import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiriyoujoukyouComponent } from './airiyoujoukyou.component';

describe('AiriyoujoukyouComponent', () => {
  let component: AiriyoujoukyouComponent;
  let fixture: ComponentFixture<AiriyoujoukyouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiriyoujoukyouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiriyoujoukyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

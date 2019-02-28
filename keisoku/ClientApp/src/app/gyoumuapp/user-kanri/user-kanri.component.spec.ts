import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserKanriComponent } from './user-kanri.component';

describe('UserKanriComponent', () => {
  let component: UserKanriComponent;
  let fixture: ComponentFixture<UserKanriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserKanriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserKanriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

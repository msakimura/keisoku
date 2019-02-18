import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerdialogComponent } from './spinnerdialog.component';

describe('SpinnerdialogComponent', () => {
  let component: SpinnerdialogComponent;
  let fixture: ComponentFixture<SpinnerdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

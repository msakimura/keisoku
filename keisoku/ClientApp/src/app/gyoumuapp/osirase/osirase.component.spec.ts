import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OsiraseComponent } from './osirase.component';

describe('OsiraseComponent', () => {
  let component: OsiraseComponent;
  let fixture: ComponentFixture<OsiraseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OsiraseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OsiraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

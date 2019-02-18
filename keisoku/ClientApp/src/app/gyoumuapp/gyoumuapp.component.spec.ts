import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GyoumuappComponent } from './gyoumuapp.component';

describe('GyoumuappComponent', () => {
  let component: GyoumuappComponent;
  let fixture: ComponentFixture<GyoumuappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GyoumuappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GyoumuappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

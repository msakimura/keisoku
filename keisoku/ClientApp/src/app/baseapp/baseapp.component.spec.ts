import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseappComponent } from './baseapp.component';

describe('BaseappComponent', () => {
  let component: BaseappComponent;
  let fixture: ComponentFixture<BaseappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

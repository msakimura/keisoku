import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GyoumuHeaderComponent } from './gyoumu-header.component';

describe('GyoumuHeaderComponent', () => {
  let component: GyoumuHeaderComponent;
  let fixture: ComponentFixture<GyoumuHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GyoumuHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GyoumuHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

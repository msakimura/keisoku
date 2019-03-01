import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerKanriComponent } from './customer-kanri.component';

describe('CustomerKanriComponent', () => {
  let component: CustomerKanriComponent;
  let fixture: ComponentFixture<CustomerKanriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerKanriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerKanriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TunnelListComponent } from './tunnel-list.component';

describe('TunnelListComponent', () => {
  let component: TunnelListComponent;
  let fixture: ComponentFixture<TunnelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TunnelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TunnelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

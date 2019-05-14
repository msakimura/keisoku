import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TunnelKanriComponent } from './tunnel-kanri.component';

describe('TunnelKanriComponent', () => {
  let component: TunnelKanriComponent;
  let fixture: ComponentFixture<TunnelKanriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TunnelKanriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TunnelKanriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

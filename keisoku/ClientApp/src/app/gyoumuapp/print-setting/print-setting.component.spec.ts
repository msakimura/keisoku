import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSettingComponent } from './print-setting.component';

describe('PrintSettingComponent', () => {
  let component: PrintSettingComponent;
  let fixture: ComponentFixture<PrintSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

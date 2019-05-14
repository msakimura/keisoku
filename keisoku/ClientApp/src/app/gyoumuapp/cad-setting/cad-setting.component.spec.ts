import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadSettingComponent } from './cad-setting.component';

describe('CadSettingComponent', () => {
  let component: CadSettingComponent;
  let fixture: ComponentFixture<CadSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

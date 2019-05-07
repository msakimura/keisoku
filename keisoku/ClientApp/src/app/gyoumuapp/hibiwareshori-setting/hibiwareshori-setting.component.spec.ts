import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HibiwareshoriSettingComponent } from './hibiwareshori-setting.component';

describe('HibiwareshoriSettingComponent', () => {
  let component: HibiwareshoriSettingComponent;
  let fixture: ComponentFixture<HibiwareshoriSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HibiwareshoriSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HibiwareshoriSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

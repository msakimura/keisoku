import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageorderSettingComponent } from './imageorder-setting.component';

describe('ImageorderSettingComponent', () => {
  let component: ImageorderSettingComponent;
  let fixture: ComponentFixture<ImageorderSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageorderSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageorderSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

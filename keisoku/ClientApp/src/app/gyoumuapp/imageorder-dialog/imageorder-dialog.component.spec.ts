import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageorderDialogComponent } from './imageorder-dialog.component';

describe('ImageorderDialogComponent', () => {
  let component: ImageorderDialogComponent;
  let fixture: ComponentFixture<ImageorderDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageorderDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageorderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

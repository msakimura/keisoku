import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnkenListComponent } from './anken-list.component';

describe('AnkenListComponent', () => {
  let component: AnkenListComponent;
  let fixture: ComponentFixture<AnkenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnkenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnkenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

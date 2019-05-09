import { TestBed, inject } from '@angular/core/testing';

import { ImageorderSettingService } from './imageorder-setting.service';

describe('ImageorderSettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageorderSettingService]
    });
  });

  it('should be created', inject([ImageorderSettingService], (service: ImageorderSettingService) => {
    expect(service).toBeTruthy();
  }));
});

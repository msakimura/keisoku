import { TestBed, inject } from '@angular/core/testing';

import { PrintSettingService } from './print-setting.service';

describe('PrintSettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PrintSettingService]
    });
  });

  it('should be created', inject([PrintSettingService], (service: PrintSettingService) => {
    expect(service).toBeTruthy();
  }));
});

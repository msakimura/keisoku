import { TestBed, inject } from '@angular/core/testing';

import { CadSettingService } from './cad-setting.service';

describe('CadSettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CadSettingService]
    });
  });

  it('should be created', inject([CadSettingService], (service: CadSettingService) => {
    expect(service).toBeTruthy();
  }));
});

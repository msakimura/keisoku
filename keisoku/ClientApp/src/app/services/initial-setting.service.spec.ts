import { TestBed, inject } from '@angular/core/testing';

import { InitialSettingService } from './initial-setting.service';

describe('InitialSettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitialSettingService]
    });
  });

  it('should be created', inject([InitialSettingService], (service: InitialSettingService) => {
    expect(service).toBeTruthy();
  }));
});

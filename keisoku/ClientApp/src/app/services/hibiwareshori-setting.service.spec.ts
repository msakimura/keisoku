import { TestBed, inject } from '@angular/core/testing';

import { HibiwareshoriSettingService } from './hibiwareshori-setting.service';

describe('HibiwareshoriSettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HibiwareshoriSettingService]
    });
  });

  it('should be created', inject([HibiwareshoriSettingService], (service: HibiwareshoriSettingService) => {
    expect(service).toBeTruthy();
  }));
});

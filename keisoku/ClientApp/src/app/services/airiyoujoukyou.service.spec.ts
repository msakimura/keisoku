import { TestBed, inject } from '@angular/core/testing';

import { AiriyoujoukyouService } from './airiyoujoukyou.service';

describe('AiriyoujoukyouService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AiriyoujoukyouService]
    });
  });

  it('should be created', inject([AiriyoujoukyouService], (service: AiriyoujoukyouService) => {
    expect(service).toBeTruthy();
  }));
});

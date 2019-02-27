import { TestBed, inject } from '@angular/core/testing';

import { TunnelService } from './tunnel.service';

describe('TunnelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TunnelService]
    });
  });

  it('should be created', inject([TunnelService], (service: TunnelService) => {
    expect(service).toBeTruthy();
  }));
});

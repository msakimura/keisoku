import { TestBed, inject } from '@angular/core/testing';

import { TunnelImageService } from './tunnel-image.service';

describe('TunnelImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TunnelImageService]
    });
  });

  it('should be created', inject([TunnelImageService], (service: TunnelImageService) => {
    expect(service).toBeTruthy();
  }));
});

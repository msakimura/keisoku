import { TestBed, inject } from '@angular/core/testing';

import { SeikahinImageService } from './seikahin-image.service';

describe('SeikahinImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeikahinImageService]
    });
  });

  it('should be created', inject([SeikahinImageService], (service: SeikahinImageService) => {
    expect(service).toBeTruthy();
  }));
});

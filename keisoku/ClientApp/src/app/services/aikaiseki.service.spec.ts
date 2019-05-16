import { TestBed, inject } from '@angular/core/testing';

import { AikaisekiService } from './aikaiseki.service';

describe('AikaisekiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AikaisekiService]
    });
  });

  it('should be created', inject([AikaisekiService], (service: AikaisekiService) => {
    expect(service).toBeTruthy();
  }));
});

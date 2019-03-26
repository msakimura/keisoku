import { TestBed, inject } from '@angular/core/testing';

import { AnkenService } from './anken.service';

describe('AnkenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnkenService]
    });
  });

  it('should be created', inject([AnkenService], (service: AnkenService) => {
    expect(service).toBeTruthy();
  }));
});

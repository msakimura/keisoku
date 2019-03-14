import { TestBed, inject } from '@angular/core/testing';

import { KengenService } from './kengen.service';

describe('KengenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KengenService]
    });
  });

  it('should be created', inject([KengenService], (service: KengenService) => {
    expect(service).toBeTruthy();
  }));
});

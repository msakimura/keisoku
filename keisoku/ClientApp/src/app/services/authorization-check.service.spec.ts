import { TestBed, inject } from '@angular/core/testing';

import { AuthorizationCheckService } from './authorization-check.service';

describe('AuthorizationCheckService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorizationCheckService]
    });
  });

  it('should be created', inject([AuthorizationCheckService], (service: AuthorizationCheckService) => {
    expect(service).toBeTruthy();
  }));
});

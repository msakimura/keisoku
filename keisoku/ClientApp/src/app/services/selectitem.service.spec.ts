import { TestBed, inject } from '@angular/core/testing';

import { SelectitemService } from './selectitem.service';

describe('SelectitemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectitemService]
    });
  });

  it('should be created', inject([SelectitemService], (service: SelectitemService) => {
    expect(service).toBeTruthy();
  }));
});

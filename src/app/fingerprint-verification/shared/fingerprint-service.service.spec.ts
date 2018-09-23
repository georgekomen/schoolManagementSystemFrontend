import { TestBed, inject } from '@angular/core/testing';

import { FingerprintServiceService } from './fingerprint-service.service';

describe('FingerprintServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FingerprintServiceService]
    });
  });

  it('should be created', inject([FingerprintServiceService], (service: FingerprintServiceService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed } from '@angular/core/testing';

import { PranayamaService } from './pranayama.service';

describe('PranayamaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PranayamaService = TestBed.get(PranayamaService);
    expect(service).toBeTruthy();
  });
});

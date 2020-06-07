import { TestBed } from '@angular/core/testing';

import { MeditationService } from './meditation.service';

describe('MeditationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MeditationService = TestBed.get(MeditationService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { YogiService } from './yogi.service';

describe('YogiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: YogiService = TestBed.get(YogiService);
    expect(service).toBeTruthy();
  });
});

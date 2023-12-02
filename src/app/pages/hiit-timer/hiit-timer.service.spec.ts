import { TestBed } from '@angular/core/testing';

import { HiitTimerService } from './hiit-timer.service';

describe('HiitTimerService', () => {
  let service: HiitTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HiitTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

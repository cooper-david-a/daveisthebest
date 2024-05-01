import { TestBed } from '@angular/core/testing';

import { IntervalTimerService } from './interval-timer.service';

describe('IntervalTimerService', () => {
  let service: IntervalTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntervalTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

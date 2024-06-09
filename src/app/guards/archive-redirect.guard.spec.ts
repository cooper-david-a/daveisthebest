import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { archiveRedirectGuard } from './archive-redirect.guard';

describe('archiveRedirectGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => archiveRedirectGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});

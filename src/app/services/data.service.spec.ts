import { TestBed, inject } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { DataService, RELATIVE_ROUTE } from './data.service';
import { provideHttpClient } from '@angular/common/http';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: RELATIVE_ROUTE, useValue: '' },
      ],
    });
    service = TestBed.inject(DataService);
  });

  it('should be created', inject([RELATIVE_ROUTE], (relativeRoute: string) => {
    expect(service).toBeTruthy();
  }));
});

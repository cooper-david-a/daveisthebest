import { TestBed, waitForAsync } from '@angular/core/testing';

import { AuthService, User } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Observable, lastValueFrom } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpTesting: HttpTestingController;
  let localStore: { [key: string]: string };

  const fakeTokens = {
    refresh:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcxMzc5OTg4MSwiaWF0IjoxNzEzNzEzNDgxLCJqdGkiOiJiNjkxZGRkZDg1MWM0YTFjODM5MjAzNWFlMzUxYjJmZCIsInVzZXJfaWQiOjF9.g6XRQWV8ANm2iRNxGZjKVPcBeOF5AY8MoCpNoumDwkw',
    access:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEzNzEzNzgxLCJpYXQiOjE3MTM3MTM0ODEsImp0aSI6IjFiY2RmNzM2NGZlNjRkZGY5YzUzYWRkNzAxZTQ2OGU1IiwidXNlcl9pZCI6MX0.3D5g4ySxzNNSQJeFKVCRHjWmzkR4-fK3Zb8FZy-9oDA',
    refreshTokenExpiresAt: 1713799880,
    accessTokenExpiresAt: 1713713780,
  };

  const fakeUser = {
    username: 'fake_user',
    email: 'fake@email.com',
    firstName: 'fake',
    lastName: 'user',
  };

  afterEach(() => {
    // Verify that none of the tests make any extra HTTP requests.
    TestBed.inject(HttpTestingController).verify();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);

    localStore = {};
    spyOn(localStorage, 'getItem').and.callFake((key) =>
      key in localStore ? localStore[key] : null
    );
    spyOn(localStorage, 'setItem').and.callFake(
      (key, value) => (localStore[key] = value + '')
    );
    spyOn(localStorage, 'removeItem').and.callFake(
      (key) => delete localStore[key]
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send post request to login endpoint on getTokensFromServer()', () => {
    service.getTokensFromServer('fake_user', 'fake_password').subscribe();

    const req = httpTesting.expectOne(
      { method: 'POST', url: service.baseUrl + service.loginUrl },
      'Request for tokens'
    );
    req.flush(fakeTokens);
  });

  it('should return current user on getCurrentUserFromServer()', () => {
    service.getCurentUserFromServer().subscribe();

    const req = httpTesting.expectOne(
      { method: 'GET', url: service.baseUrl + service.meUrl },
      'Request for current user'
    );
    req.flush(fakeUser);
  });

  it('should save tokens to local storage and return Observable<User> on login()', async () => {
    let userPromise = lastValueFrom(
      service.login('fake_user', 'fake_password')
    );

    const req = httpTesting.expectOne(
      { method: 'POST', url: service.baseUrl + service.loginUrl },
      'Request for tokens'
    );
    req.flush(fakeTokens);

    expect(localStore).toEqual(
      jasmine.objectContaining({ access: fakeTokens.access })
    );
  });
});

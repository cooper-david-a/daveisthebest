import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:8000/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    const loginUrl = 'jwt/create';
    return this.http.post<AuthTokens | { detail: string }>(
      this.baseUrl + loginUrl,
      { username: username, password: password }
    );
  }

  refresh(refreshToken: string) {
    const refreshUrl = 'jwt/refresh';
    return this.http.post<AuthTokens | { detail: string; code: string }>(
      this.baseUrl + refreshUrl,
      { refresh: refreshToken }
    );
  }

  verify(token: string) {
    const verifyUrl = 'jwt/verify';
    return this.http.post<{} | { detail: string; code: string }>(
      this.baseUrl + verifyUrl,
      { refresh: token }
    );
  }


}

interface AuthTokens {
  refresh?: string;
  refreshTokenExpiresAt?: number;
  access: string;
  accessTokenExpiresAt: number;
}

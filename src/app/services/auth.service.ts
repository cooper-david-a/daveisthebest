import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Observable, concat, map, shareReplay } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  currentUser: User | null = null;
  http: HttpClient = inject(HttpClient);
  platformId = inject(PLATFORM_ID);

  loginUrl = 'jwt/create/';
  meUrl = 'users/me/';
  registerUrl = 'users/';
  activationUrl = 'users/activation/';
  resetPasswordUrl = 'users/reset_password/';
  resetPasswordConfirmUrl = 'users/reset_password_confirm/';

  constructor() {
    if (isPlatformBrowser(this.platformId) && this.isLoggedIn) {
      concat(this.doRefreshToken(), this.getCurentUserFromServer()).subscribe();
    }
  }

  login(username: string, password: string): Observable<void | User> {
    return concat(
      this.getTokensFromServer(username, password),
      this.getCurentUserFromServer()
    ).pipe(shareReplay());
  }

  logout() {
    this.stopRefreshTokenTimer();
    this.currentUser = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  }

  register(user: User) {
    return this.http
      .post<User>(this.baseUrl + this.registerUrl, user)
      .pipe(shareReplay());
  }

  activate(uid: string, token: string) {
    return this.http
      .post(this.baseUrl + this.activationUrl, { uid: uid, token: token })
      .pipe(shareReplay());
  }

  resetPassword(email: string) {
    return this.http
      .post(this.baseUrl + this.resetPasswordUrl, { email: email })
      .pipe(shareReplay());
  }

  resetPasswordConfirm(uid: string, token: string, newPassword: string) {
    return this.http.post(this.baseUrl + this.resetPasswordConfirmUrl, {
      uid: uid,
      token: token,
      newPassword: newPassword,
    });
  }

  doRefreshToken() {
    const refreshUrl = 'jwt/refresh/';

    this.stopRefreshTokenTimer();

    const refreshTokenString = isPlatformBrowser(this.platformId)
      ? localStorage.getItem('refreshToken')
      : null;

    return this.http
      .post<TokenStrings>(this.baseUrl + refreshUrl, {
        refresh: refreshTokenString,
      })
      .pipe(
        map((token) => {
          localStorage.setItem('accessToken', token.access);
        })
      );
  }

  getTokensFromServer(username: string, password: string): Observable<void> {
    return this.http
      .post<TokenStrings>(this.baseUrl + this.loginUrl, {
        username: username,
        password: password,
      })
      .pipe(
        map((tokenStrings: TokenStrings) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('accessToken', tokenStrings.access);
            localStorage.setItem('refreshToken', tokenStrings.refresh ?? '');
          }
        })
      );
  }

  getCurentUserFromServer(): Observable<User> {
    return this.http
      .get<User>(this.baseUrl + this.meUrl)
      .pipe(map((user) => (this.currentUser = user)));
  }

  get isLoggedIn() {
    let refreshToken = isPlatformBrowser(this.platformId)
      ? localStorage.getItem('refreshToken')
      : null;
    if (refreshToken) {
      let refreshTokenBody: TokenBodyObject = JSON.parse(
        atob(refreshToken.split('.')[1])
      );
      return new Date(refreshTokenBody.exp * 1000) > new Date();
    }
    return false;
  }

  private refreshTokenTimeout!: NodeJS.Timeout;

  private startRefreshTokenTimer() {
    if (isPlatformBrowser(this.platformId)) {
      // set a timeout to refresh the token a minute before it expires
      try {
        const accessTokenString =
          localStorage.getItem('accessToken')?.split('.')[1] ?? '';
        const accessTokenObject: TokenBodyObject = JSON.parse(
          atob(accessTokenString)
        );
        const timeout = accessTokenObject.exp - Date.now() / 1000 - 60;
        this.refreshTokenTimeout = setTimeout(
          () => this.doRefreshToken().subscribe(),
          timeout * 1000
        );
      } catch (error) {
        console.log(error);
      }
    }
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}

export interface User {
  username: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
}

interface TokenBodyObject {
  token_type: string;
  exp: number;
  iat: number;
  jti: string;
  user_id: number;
}

interface TokenStrings {
  access: string;
  refresh?: string;
}

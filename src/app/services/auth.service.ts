import { Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, shareReplay, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  baseUrl = environment.apiUrl + 'auth/';
  currentUser = new BehaviorSubject<User | null>(null);
  tokens = new BehaviorSubject<AuthTokens | null>(null);

  constructor(private http: HttpClient) {
    if (isPlatformBrowser(PLATFORM_ID)) {
      console.log('auth service constructor');
      this.loadTokensFromStorage();
      this.getMe();
    }
  }
  ngOnInit(): void {
    console.log('auth service ngOnInit');
  }

  login(username: string, password: string) {
    const loginUrl = 'jwt/create/';
    return this.http
      .post<AuthTokens>(this.baseUrl + loginUrl, {
        username: username,
        password: password,
      })
      .pipe(
        shareReplay(),
        map((tokens) => {
          this.tokens.next(tokens);
          this.saveTokens(tokens);
          this.getMe();
          this.startRefreshTokenTimer();
          return tokens;
        })
      );
  }

  register(user: User) {
    const registerUrl = 'users/';
    return this.http
      .post<User>(this.baseUrl + registerUrl, user)
      .pipe(shareReplay());
  }

  logout() {
    this.stopRefreshTokenTimer();
    localStorage.removeItem('access');
    localStorage.removeItem('accessTokenExpiresAt');
    localStorage.removeItem('refresh');
    localStorage.removeItem('refreshTokenExpiresAt');
    this.tokens.next(null);
    this.currentUser.next(null);
  }

  refresh() {
    const refreshUrl = 'jwt/refresh/';
    const tokens = this.tokens.getValue();
    return this.http
      .post<AuthTokens>(this.baseUrl + refreshUrl, {
        refresh: tokens?.refresh,
      })
      .pipe(
        map((tokens) => {
          this.saveTokens(tokens);
          return tokens;
        })
      );
  }

  saveTokens(tokens: AuthTokens) {
    localStorage.setItem('access', tokens.access);
    localStorage.setItem(
      'accessTokenExpiresAt',
      tokens.accessTokenExpiresAt.toString()
    );
    if (tokens.refresh) {
      localStorage.setItem('refresh', tokens.refresh);
    }
    if (tokens.refreshTokenExpiresAt) {
      localStorage.setItem(
        'refreshTokenExpiresAt',
        tokens.refreshTokenExpiresAt.toString()
      );
    }
  }

  getMe() {
    const meUrl = 'users/me/';
    this.http
      .get<User>(this.baseUrl + meUrl)
      .subscribe((me) => this.currentUser.next(me));
  }

  isLoggedIn() {
    return !!this.currentUser.getValue();
  }

  //helper methods

  private refreshTokenTimeout!: NodeJS.Timeout;

  private startRefreshTokenTimer() {
    let tokens = this.tokens.getValue();
    // set a timeout to refresh the token a minute before it expires
    if (tokens) {
      const expires = tokens.accessTokenExpiresAt;
      const timeout = expires - Date.now() / 1000 - 60;
      this.refreshTokenTimeout = setTimeout(
        () => this.refresh().subscribe(),
        timeout * 1000
      );
    }
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  private loadTokensFromStorage() {
    let access = localStorage.getItem('access');
    let accessTokenExpiresAt = Number(
      localStorage.getItem('accessTokenExpiresAt')
    );
    let refresh = localStorage.getItem('refresh');
    let refreshTokenExpiresAt = Number(
      localStorage.getItem('refreshTokenExpiresAt')
    );
    if (access && refresh) {
      this.tokens.next({
        access,
        accessTokenExpiresAt,
        refresh,
        refreshTokenExpiresAt,
      });
      this.startRefreshTokenTimer();
    }
  }
}

interface AuthTokens {
  refresh?: string;
  refreshTokenExpiresAt?: number;
  access: string;
  accessTokenExpiresAt: number;
}

interface User {
  username: string;
  email: string;
  password?: string;
  firstName: string;
  lastName: string;
}

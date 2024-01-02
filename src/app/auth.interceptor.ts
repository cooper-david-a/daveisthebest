import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  accessToken: string | undefined;

  constructor(private authService: AuthService) {
    this.authService.tokens.subscribe((tokens) => {
      this.accessToken = tokens?.access;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.accessToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT ' + this.accessToken),
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}

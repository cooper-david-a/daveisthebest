import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let platformId = inject(PLATFORM_ID);
  const accessToken = isPlatformBrowser(platformId)
    ? localStorage.getItem('accessToken')
    : null;
  if (accessToken) {
    let accessTokenExpires = new Date(
      JSON.parse(atob(accessToken.split('.')[1])).exp * 1000
    );

    if (accessTokenExpires > new Date()) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'JWT ' + accessToken),
      });
      return next(cloned);
    }
  }
  return next(req);
};

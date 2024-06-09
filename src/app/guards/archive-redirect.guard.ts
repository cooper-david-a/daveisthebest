import { CanActivateFn } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export const archiveRedirectGuard: CanActivateFn = (route, state) => {
  let document = inject(DOCUMENT);
  document.location.href = 'https://archive.daveisthebest.com';
  return false;
};

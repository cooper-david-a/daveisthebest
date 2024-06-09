import { Routes } from '@angular/router';
import { archiveRedirectGuard } from './guards/archive-redirect.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'activate-account/:uid/:token',
    loadComponent: () =>
      import(
        'src/app/pages/login/activate-account/activate-account.component'
      ).then((m) => m.ActivateAccountComponent),
  },
  {
    path: 'password-reset/:uid/:token',
    loadComponent: () =>
      import(
        'src/app/pages/login/password-reset/password-reset.component'
      ).then((m) => m.PasswordResetComponent),
  },
  {
    path: 'interval-timer',
    loadComponent: () =>
      import('./pages/interval-timer/interval-timer.component').then(
        (m) => m.IntervalTimerComponent
      ),
  },
  {
    path: 'thermodynamic-property-calculator',
    loadComponent: () =>
      import(
        './pages/thermodynamic-property-calculator/thermodynamic-property-calculator.component'
      ).then((m) => m.ThermodynamicPropertyCalculatorComponent),
  },
  {
    path: 'archive',
    canActivate: [archiveRedirectGuard],
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent
      ),
  },
];

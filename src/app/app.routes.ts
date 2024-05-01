import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login-form/login-form.component').then(
        (m) => m.LoginFormComponent
      ),
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
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found.component').then((m) => m.PageNotFoundComponent),
  },
];

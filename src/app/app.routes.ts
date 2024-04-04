import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login-form/login-form.component').then(
        (m) => m.LoginFormComponent
      ),
  },
  {
    path: 'hiit-timer',
    loadComponent: () =>
      import('./pages/hiit-timer/hiit-timer.component').then(
        (m) => m.HiitTimerComponent
      ),
  },
  {
    path: 'thermodynamic-property-calculator',
    loadComponent: () =>
      import(
        './pages/thermodynamic-property-calculator/thermodynamic-property-calculator.component'
      ).then((m) => m.ThermodynamicPropertyCalculatorComponent),
  },
];

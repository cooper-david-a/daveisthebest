import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HiitTimerComponent } from './pages/hiit-timer/hiit-timer.component';
import { ThermodynamicPropertyCalculatorComponent } from './pages/thermodynamic-property-calculator/thermodynamic-property-calculator.component';
import { LoginFormComponent } from './login-form/login-form.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginFormComponent },
  { path: 'hiit-timer', component: HiitTimerComponent },
  {
    path: 'thermodynamic-property-calculator',
    component: ThermodynamicPropertyCalculatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

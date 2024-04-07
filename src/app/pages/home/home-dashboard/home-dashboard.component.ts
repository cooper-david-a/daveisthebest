import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';


@Component({
    selector: 'home-dashboard',
    templateUrl: './home-dashboard.component.html',
    styleUrls: ['./home-dashboard.component.scss'],
    standalone: true,
    imports: [
    RouterLink,
    MatCardModule
],
})
export class HomeDashboardComponent {
  cards = [
    {
      title: 'HIIT Timer',
      imgUrl: 'assets/images/HIIT_Timer_card.png',
      text: 'This is the best HIIT Timer ever.',
      link: ['hiit-timer']
    },
    // {
    //   title: 'Thermodynamic Property Calculator',
    //   imgUrl: 'assets/images/ThermoPropertyCalculator_card.png',
    //   text: 'Calculate thermodynamic properties of water and R134a.',
    //   link: ['thermodynamic-property-calculator']
    // },

  ];
}

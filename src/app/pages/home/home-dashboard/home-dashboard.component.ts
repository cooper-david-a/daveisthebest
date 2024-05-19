import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.scss'],
  standalone: true,
  imports: [RouterLink, MatCardModule],
})
export class HomeDashboardComponent {
  cards = [
    {
      title: 'Interval Timer',
      imgUrl: 'assets/images/Interval_Timer_card.png',
      text: 'This is the best interval timer ever.',
      link: ['interval-timer'],
    },
    {
      title: 'Thermodynamic Property Calculator',
      imgUrl: 'assets/images/ThermoPropertyCalculator_card.png',
      text: 'Calculate thermodynamic properties of water and R134a.',
      link: ['thermodynamic-property-calculator']
    },
  ];
}

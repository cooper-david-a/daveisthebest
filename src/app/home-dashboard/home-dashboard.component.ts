import { Component } from '@angular/core';

@Component({
  selector: 'home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css'],
})
export class HomeDashboardComponent {
  cards = [
    {
      title: 'HIIT Timer',
      imgUrl: 'assets/images/HIIT_Timer_card.png',
      text: 'This is the best HIIT Timer ever.',
      linkUrl: '/HIIT_Timer'
    },
    {
      title: 'Thermodynamic Property Calculator',
      imgUrl: 'assets/images/ThermoPropertyCalculator_card.png',
      text: 'Calculate thermodynamic properties of water and R134a.',
      linkUrl: '/ThermodynamicPropertyCalculator'
    },

  ];
}

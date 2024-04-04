import { Component } from '@angular/core';
import { HomeDashboardComponent } from './home-dashboard/home-dashboard.component';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: true,
    imports: [HomeDashboardComponent]
})
export class HomeComponent {

}

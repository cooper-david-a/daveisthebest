import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DaveIsTheBest';
  user!: string;
  accessToken!: string;
  refreshToken!: string;
}

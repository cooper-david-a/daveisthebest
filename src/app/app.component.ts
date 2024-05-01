import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { AuthService } from './services/auth.service';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    RouterLink,
    RouterOutlet,
  ],
})
export class AppComponent {
  title = 'DaveIsTheBest';
  constructor(public authService: AuthService) {}
}

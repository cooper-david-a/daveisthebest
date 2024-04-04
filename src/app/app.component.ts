import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { CommentsComponent } from './comments/comments.component';
import { AuthService } from './services/auth.service';

import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    RouterLink,
    RouterOutlet,
    CommentsComponent,
  ],
})
export class AppComponent {
  title = 'DaveIsTheBest';
  constructor(public authService: AuthService) {}
}

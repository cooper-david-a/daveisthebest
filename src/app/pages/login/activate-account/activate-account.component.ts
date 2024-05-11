import { Component, Input, OnInit, inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'activate-account',
  standalone: true,
  imports: [],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss',
})
export class ActivateAccountComponent implements OnInit {
  authService = inject(AuthService);
  @Input() uid = '';
  @Input() token = '';

  ngOnInit(): void {
    this.authService.activate(this.uid, this.token).subscribe();
  }
}

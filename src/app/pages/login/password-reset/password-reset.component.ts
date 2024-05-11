import { Component, Input, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { LoginValidators } from '../login.validators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  DefaultErrorStateMatcher,
  PasswordErrorStateMatcher,
} from '../login.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'password-reset',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss',
})
export class PasswordResetComponent {
  authService = inject(AuthService);
  router = inject(Router);
  @Input() uid = '';
  @Input() token = '';

  defaultMatcher = new DefaultErrorStateMatcher();
  passwordMatcher = new PasswordErrorStateMatcher();

  passwordForm = new FormGroup(
    {
      password: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      confirmPassword: new FormControl<string>('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    },
    LoginValidators.confirmPasswordMatchesValidator
  );
passWordErrorMessage: any;

  doChangePassword() {
    if (this.passwordForm.valid) {
      let password = this.passwordForm.value.password ?? '';
      this.authService
        .resetPasswordConfirm(this.uid, this.token, password)
        .subscribe((res) => this.router.navigate(['login']));
    }
  }
}

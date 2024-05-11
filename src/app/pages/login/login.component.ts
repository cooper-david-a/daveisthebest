import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginValidators } from './login.validators';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { PasswordResetDialogComponent } from './password-reset-dialog/password-reset-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatListModule,
  ],
})
export class LoginComponent implements OnInit {
  errorMessages: string[] = [];
  successMessage = '';

  isLoading = false;
  needToRegister = false;
  defaultMatcher = new DefaultErrorStateMatcher();
  passwordMatcher = new PasswordErrorStateMatcher();
  loginForm = new FormGroup<Login>({
    username: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(8)],
      nonNullable: true,
    }),
  });
  returnUrl!: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public passwordResetDialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.isLoading = true;
    this.errorMessages = [];
    this.successMessage = '';
    if (this.loginForm.valid) {
      let username = this.loginForm.value.username
        ? this.loginForm.value.username
        : '';
      let password = this.loginForm.value.password
        ? this.loginForm.value.password
        : '';
      let email = this.loginForm.value.email ? this.loginForm.value.email : '';
      let firstName = this.loginForm.value.firstName
        ? this.loginForm.value.firstName
        : '';
      let lastName = this.loginForm.value.lastName
        ? this.loginForm.value.lastName
        : '';
      if (this.needToRegister) {
        this.authService
          .register({
            username: username,
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
          })
          .subscribe({
            next: (user) => {
              this.setSuccessMessage(
                'Please check your email for a link to activate your account.',
                10
              );
              this.needToRegister = false;
            },
            error: (err: HttpErrorResponse) => {
              this.errorMessages = this.extractErrorMessages(err);
              setTimeout(() => (this.errorMessages = []), 10000);
              this.isLoading = false;
              console.error(err);
            },
            complete: () => {
              this.isLoading = false;
            },
          });
      } else {
        this.authService.login(username, password).subscribe({
          next: (tokens) => {
            this.router.navigate([this.returnUrl]);
          },
          error: (err) => {
            this.errorMessages = Object.values(err.error);
            setTimeout(() => (this.errorMessages = []), 10000);
            this.isLoading = false;
            console.error(err);
          },
          complete: () => {
            this.isLoading = false;
          },
        });
      }
    }
  }

  registerOrLogin() {
    this.needToRegister = !this.needToRegister;
    if (this.needToRegister) {
      this.loginForm.addControl(
        'confirmPassword',
        new FormControl<string>('', {
          validators: [Validators.required],
          nonNullable: true,
        })
      );
      this.loginForm.addControl(
        'firstName',
        new FormControl<string>('', {
          validators: [],
          nonNullable: true,
        })
      );
      this.loginForm.addControl(
        'lastName',
        new FormControl<string>('', {
          validators: [],
          nonNullable: true,
        })
      );
      this.loginForm.addControl(
        'email',
        new FormControl<string>('', {
          validators: [Validators.email, Validators.required],
          nonNullable: true,
        })
      );
      this.loginForm.addValidators([
        LoginValidators.confirmPasswordMatchesValidator,
      ]);
    } else {
      this.loginForm.removeControl('confirmPassword');
      this.loginForm.removeControl('email');
      this.loginForm.removeControl('firstName');
      this.loginForm.removeControl('lastName');
      this.loginForm.removeValidators([
        LoginValidators.confirmPasswordMatchesValidator,
      ]);
    }
  }

  resetPassword() {
    const dialogRef = this.passwordResetDialog.open(
      PasswordResetDialogComponent
    );

    dialogRef.afterClosed().subscribe((email: string) => {
      if (email)
        this.authService
          .resetPassword(email)
          .subscribe(() =>
            this.setSuccessMessage(
              'Please check your email for a link to reset your password.',
              10
            )
          );
    });
  }

  extractErrorMessages(err: HttpErrorResponse) {
    const fields = Object.keys(err.error);
    fields.forEach((field) => {
      const control = this.loginForm.controls[field as keyof Login];
      if (control) control.setErrors({ fromBackend: true });
    });
    return Object.values(err.error).flat() as string[];
  }

  setSuccessMessage(msg: string, seconds: number) {
    this.successMessage = msg;
    setTimeout(() => (this.successMessage = ''), seconds * 1000);
  }
}

interface Login {
  username: FormControl<string>;
  password: FormControl<string>;
  firstName?: FormControl<string>;
  lastName?: FormControl<string>;
  email?: FormControl<string>;
  confirmPassword?: FormControl<string>;
}

export class DefaultErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      control.dirty &&
      (control.touched || isSubmitted)
    );
  }
}

export class PasswordErrorStateMatcher extends DefaultErrorStateMatcher {
  override isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    let passwordsDoNotMatch = form?.getError('passwordsDoNotMatch');
    return super.isErrorState(control, form) || passwordsDoNotMatch;
  }
}
